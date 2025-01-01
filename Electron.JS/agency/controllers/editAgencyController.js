const { Agency } = require('../../models/agency');
const { AgencyType } = require('../../models/agencytype');

class EditAgency{
  static updateAgency = async (agencyData) => {
    const { 
      agencyCode, 
      agencyName, 
      agencyType, 
      agencyAddress, 
      agencyDistrict, 
      onboardDate, 
      agencyPhone, 
      agencyEmail, 
      agencyDebt 
    } = agencyData;

    console.log(`Updating agency with code: ${agencyCode}`);

    try {
      // Kiểm tra xem type có tồn tại không
      const agencyTypeExists = await AgencyType.findOne({
        where: {
          type: agencyType,
        },
      });

      if (!agencyTypeExists) {
        return { success: false, message: 'Invalid agency type' };
      }

      // Tìm agency theo mã code
      const agency = await Agency.findOne({
        where: {
          agencyCode: agencyCode,
        },
      });

      if (!agency) {
        return { success: false, message: 'Agency not found' };
      }

      // Cập nhật thông tin agency
      agency.name = agencyName;
      agency.type = agencyType;
      agency.address = agencyAddress;
      agency.district = agencyDistrict;
      agency.receptionDate = onboardDate;
      agency.phone = agencyPhone;
      agency.email = agencyEmail;
      agency.currentDebt = agencyDebt;

      // Lưu thay đổi vào database
      await agency.save();

      return { success: true, message: 'Agency updated successfully' };

    } catch (error) {
      console.error('Error updating agency:', error);
      return { success: false, message: 'An error occurred while updating the agency' };
    }
  };

  static deleteAgency = async (agencyCode) => { 
    console.log(`Deleting agency with code: ${agencyCode}`);

    try {
      // Tìm agency theo mã code
      const agency = await Agency.findOne({
        where: {
          agencyCode: agencyCode,
        },
      });

      if (!agency) {
        return { success: false, message: 'Agency not found' };
      }

      // Xóa agency khỏi database
      await agency.destroy();

      return { success: true, message: 'Agency deleted successfully' };

    } catch (error) {
      console.error('Error deleting agency:', error);
      return { success: false, message: 'An error occurred while deleting the agency' };
    }
  }
}

module.exports = EditAgency;
