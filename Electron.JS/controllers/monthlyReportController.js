const { DeliveryNote } = require('../models/deliverynote');
const { Agency } = require('../models/agency');
const { DeliveryNoteDetail } = require('../models/deliverynotedetail');
const { PaymentReceipt } = require('../models/paymentreceipt');
const { RevenueReport } = require('../models/revenuereport');
const { DebtHistory } = require('../models/debthistory');
const { Op } = require('sequelize');

const searchDeliveryNotesByDate = async (criteria) => {
  try {
    const { month, year } = criteria;
    const where = {};

    if (month && year) {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);

      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999); 

      where.deliveryDate = {
        [Op.between]: [startDate, endDate]
      };
    };
    const result = await DeliveryNote.findAll({ where });
    return result;

  } catch (error) {
    console.error('Error:', error);
  }
}

const countNoteByAgency = async (deliveryNotes) => {
  try {
    if (!deliveryNotes || deliveryNotes.length === 0) {
      return [];
    }

    const countByAgency = {};

    deliveryNotes.forEach(note => {
      const agencyCode = note.dataValues.agencyCode;
      if (!countByAgency[agencyCode]) {
        countByAgency[agencyCode] = { count: 0, totalPrice: 0 };
      }

      countByAgency[agencyCode].count++;
    });

    const agencyCodes = Object.keys(countByAgency);
    const agencies = await Agency.findAll({
      where: {
        agencyCode: agencyCodes
      },
      attributes: ['agencyCode', 'name'] 
    });

    agencies.forEach(agency => {
      const agencyCode = agency.agencyCode;
      if (countByAgency[agencyCode]) {
        countByAgency[agencyCode].name = agency.name;
      }
    });

    const totalPriceByAgency = await sumTotalPriceByAgency(deliveryNotes);

    for (const agencyCode in totalPriceByAgency) {
      if (countByAgency[agencyCode]) {
        countByAgency[agencyCode].totalPrice = totalPriceByAgency[agencyCode];
      }
    }

    return countByAgency;

  } catch (error) {
    console.error('Error:', error);
  }
};


  const sumTotalPriceByAgency = async (deliveryNotes) => {
    try {
      if (!deliveryNotes || deliveryNotes.length === 0) {
        return [];
      }

      const totalPriceByAgency = {};
      for (const note of deliveryNotes) {
        const agencyCode = note.dataValues.agencyCode;
        const dnCode = note.dataValues.deliveryNoteCode;

        const details = await DeliveryNoteDetail.findAll({
          where: { deliveryNoteCode: dnCode },
          attributes: ['totalPrice']
        });
  
        const totalForNote = details.reduce((sum, detail) => {
          return sum + (detail.totalPrice || 0);
        }, 0);

        if (totalPriceByAgency[agencyCode]) {
          totalPriceByAgency[agencyCode] += totalForNote;
        } else {
          totalPriceByAgency[agencyCode] = totalForNote;
        }
      }
  
      return totalPriceByAgency;
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const calculateProportion = (table) => {
    let totalSum = 0;

    for (const agencyCode in table) {
      totalSum += table[agencyCode].totalPrice || 0;
    }

    for (const agencyCode in table) {
      const agency = table[agencyCode];
      agency.proportion = totalSum === 0 
        ? 0 
        : ((agency.totalPrice || 0) * 100 / totalSum).toFixed(2); // Làm tròn 2 chữ số
    }
  
    return table;
  };

  const getTotalDebtBeforeMonth = async (month, year) => {
    try {
      const startDate = new Date(year, month - 1, 1);

      const deliveryNotes = await DeliveryNote.findAll({
        where: {
          deliveryDate: {
            [Op.lt]: startDate
          }
        },
        attributes: ['deliveryNoteCode', 'agencyCode'],
      });

      const totalDebts = {};

      for (const note of deliveryNotes) {
        const deliveryNoteDetails = await DeliveryNoteDetail.findAll({
          where: {
            deliveryNoteCode: note.deliveryNoteCode 
          },
          attributes: ['totalPrice'],
        });

        const agencyCode = note.agencyCode;

        if (!totalDebts[agencyCode]) {
          totalDebts[agencyCode] = 0;
        }

        deliveryNoteDetails.forEach(detail => {
          totalDebts[agencyCode] += detail.totalPrice;
        });
      }
      return totalDebts; 
    } catch (error) {
      console.error('Error calculating total debt before the specified month:', error);
    }
  };

  const getPaymentsBeforeMonth = async (month, year) => {
    try {
      const startDate = new Date(year, month - 1, 1);

      const previousPayments = await PaymentReceipt.findAll({
        where: {
          paymentDate: {
            [Op.lt]: startDate 
          }
        },
        attributes: ['agencyCode', 'amount', 'paymentDate'] 
      });
      return previousPayments;
    } catch (error) {
      console.error('Error fetching payments before the specified month:', error);
    }
  };

  const renderDebtTable = async (month, year, table) => {
    try {
      const agencies = await Agency.findAll({
        attributes: ['agencyCode', 'name'],
      });

      const debtData = {};
      agencies.forEach(agency => {
        const agencyData = table[agency.agencyCode];
        if (agencyData) {
          console.log(`Data for ${agency.agencyCode}:`, agencyData);
          debtData[agency.agencyCode] = {
            name: agency.name,
            initialDebt: 0, 
            incurredCost: agencyData.totalPrice, 
            finalDebt: 0, 
          };
        } else {
          debtData[agency.agencyCode] = {
            name: agency.name,
            initialDebt: 0, 
            incurredCost: 0, 
            finalDebt: 0, 
          };
        }
      });

      const debtBefore = await getTotalDebtBeforeMonth(month, year);
      
      const payBefore = await getPaymentsBeforeMonth(month, year);
      const initDebtData = {};

      for (const agencyCode in debtBefore) {
        const totalDebt = debtBefore[agencyCode];

        let totalPaid = 0;
        payBefore.forEach(payment => {
          if (payment.agencyCode === agencyCode) {
            totalPaid += payment.amount;
          }
        });

        initDebtData[agencyCode] = totalDebt - totalPaid;
      }

      for (const agencyCode in initDebtData) {
        if (debtData[agencyCode]) {
          debtData[agencyCode].initialDebt = initDebtData[agencyCode];
        }
      }

      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);

      const paymentReceipts = await PaymentReceipt.findAll({
        where: {
          paymentDate: {
            [Op.between]: [startDate, endDate],
          },
        },
        attributes: ['agencyCode', 'amount'], 
      });

      paymentReceipts.forEach(receipt => {
        if (debtData[receipt.agencyCode]) {
          debtData[receipt.agencyCode].incurredCost -= receipt.amount;
        }
      });

      for (const agencyCode in debtData) {
        const agency = debtData[agencyCode];
        agency.finalDebt = agency.initialDebt + agency.incurredCost; 
      }
      return debtData;
    } catch (error) {
      console.error('Error rendering debt table:', error);
    }
};

async function saveRevenueReport(month, year, reportData) {
  try {
      console.log("Month: ", month, "Year: ", year);
      const dateString = `${year}-${String(month).padStart(2, '0')}-01`;
      console.log(dateString);
      for (const agencyCode in reportData) {
          const note = reportData[agencyCode];
          const existingReport = await RevenueReport.findOne({
              where: {
                  agencyCode: agencyCode,
                  date: new Date(dateString) 
              }
          });

          if (existingReport) {
              continue; 
          }

          await RevenueReport.create({
              date: new Date(dateString),
              agencyCode: agencyCode,
              numberOfDeliveryNotes: note.count || 0,
              totalValue: note.totalPrice || 0,
              rate: note.proportion || 0,
          });
      }
  } catch (error) {
      throw new Error('Failed to save revenue report: ' + error.message);
  }
}

async function saveDebtHistory(month, year, table_debt) {
  try {
      console.log("Month: ", month, "Year: ", year);
      const dateString = `${year}-${String(month).padStart(2, '0')}-01`; // Ngày 1 của tháng
      console.log(dateString);

      // Duyệt qua các agency trong bảng table_debt
      for (const agencyCode in table_debt) {
          const note = table_debt[agencyCode];

          // Kiểm tra xem có báo cáo nợ nào với cùng agencyCode và date trong cơ sở dữ liệu chưa
          const existingDebt = await DebtHistory.findOne({
              where: {
                  agencyCode: agencyCode,
                  date: new Date(dateString) // Kiểm tra theo ngày tháng đã định dạng
              }
          });

          // Nếu có báo cáo nợ rồi, không thêm nữa
          if (existingDebt) {
              console.log(`Debt report for ${agencyCode} in ${dateString} already exists. Skipping...`);
              continue; // Bỏ qua phần tử này
          }

          // Nếu không có, tiếp tục thêm báo cáo nợ mới vào cơ sở dữ liệu
          await DebtHistory.create({
              agencyCode: agencyCode,
              date: new Date(dateString),
              initialDebt: note.initialDebt || 0,
              endDebt: note.finalDebt || 0,
              incurredDebt: note.incurredCost || 0,
          });
      }
      console.log("Debt reports saved successfully.");
  } catch (error) {
      throw new Error('Failed to save debt history: ' + error.message);
  }
}


module.exports = { searchDeliveryNotesByDate, countNoteByAgency, calculateProportion, renderDebtTable, saveRevenueReport, saveDebtHistory };
