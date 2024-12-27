const { DeliveryNote } = require('../models/deliverynote');
const { Agency } = require('../models/agency');
const { DeliveryNoteDetail } = require('../models/deliverynotedetail');
const { Op } = require('sequelize');

const searchDeliveryNotesByDate = async (criteria) => {
  try {
    const { month, year } = criteria;
    const where = {};

    if (month && year) {
      // Tạo ngày bắt đầu và ngày kết thúc của tháng
      const startDate = new Date(year, month - 1, 1); // Ngày đầu tháng
      const endDate = new Date(year, month, 0); // Ngày cuối tháng

      // Đảm bảo chỉ so sánh ngày (không có giờ)
      startDate.setHours(0, 0, 0, 0); // Đặt giờ thành 00:00:00
      endDate.setHours(23, 59, 59, 999); // Đặt giờ cuối ngày thành 23:59:59

      where.deliveryDate = {
        [Op.between]: [startDate, endDate]
      };
    };
    const result = await DeliveryNote.findAll({ where });
    console.log(result); // In ra dữ liệu thực tế
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
        console.log(agencyCode);
        if (!countByAgency[agencyCode]) {
            countByAgency[agencyCode] = 0;
        }
  
        countByAgency[agencyCode]++;
      });

      const agencyCodes = Object.keys(countByAgency);
      const agencies = await Agency.findAll({
        where: {
          agencyCode: agencyCodes
        },
        attributes: ['agencyCode', 'name'] // Chỉ lấy các trường cần thiết
      });
  
      // Cập nhật name vào countByAgency
      agencies.forEach(agency => {
        const agencyCode = agency.agencyCode;
        if (countByAgency[agencyCode]) {
          countByAgency[agencyCode].name = agency.name;
        }
      });  
      console.log(countByAgency);
      //const sumPrice = sumTotalPriceByAgency(deliveryNotes);
      return countByAgency;
      
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const sumTotalPriceByAgency = async (deliveryNotes) => {
    try {
      // Nếu không có delivery notes thì trả về kết quả trống
      if (!deliveryNotes || deliveryNotes.length === 0) {
        return [];
      }
  
      // Tạo một đối tượng để lưu tổng giá trị theo agency
      const totalPriceByAgency = {};
  
      // Duyệt qua từng DeliveryNote và truy vấn DeliveryNoteDetail
      for (const note of deliveryNotes) {
        const agencyCode = note.dataValues.agencyCode; // Lấy agencyCode từ DeliveryNote
        const dnCode = note.dataValues.deliveryNoteCode; // Lấy ID của DeliveryNote
  
        // Truy vấn tổng giá trị totalPrice từ DeliveryNoteDetail
        const details = await DeliveryNoteDetail.findAll({
          where: { deliveryNoteCode: dnCode },
          attributes: ['totalPrice']
        });
  
        // Tính tổng giá trị totalPrice từ DeliveryNoteDetail
        const totalForNote = details.reduce((sum, detail) => {
          return sum + (detail.totalPrice || 0); // Cộng dồn giá trị totalPrice
        }, 0);
  
        // Nếu agencyCode đã tồn tại trong totalPriceByAgency, cộng dồn giá trị
        if (totalPriceByAgency[agencyCode]) {
          totalPriceByAgency[agencyCode] += totalForNote;
        } else {
          // Nếu chưa tồn tại, khởi tạo tổng giá trị ban đầu
          totalPriceByAgency[agencyCode] = totalForNote;
        }
      }
  
      // Trả về kết quả là danh sách các agency và tổng giá trị totalPrice
      return totalPriceByAgency;
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

module.exports = { searchDeliveryNotesByDate, countNoteByAgency };
