const { Agency } = require('../../models/agency');
const { AgencyType } = require('../../models/agencytype');
const { Regulation } = require('../../models/regulation')

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

    try {
      const agencyTypeExists = await AgencyType.findOne({
        where: {
          type: agencyType,
        },
      });

      if (!agencyTypeExists) {
        return { success: false, message: 'Invalid agency type' };
      }

      const agency = await Agency.findOne({
        where: {
          agencyCode: agencyCode,
        },
      });

      if (!agency) {
        return { success: false, message: 'Agency not found' };
      }

      const regulation = await Regulation.findOne();
      const maxAgenciesPerDistrict = regulation.maxAgenciesPerDistrict;

      const agencyCount = await Agency.count({
        where: {
          district: agencyDistrict,
        },
      });

      if (agencyCount >= maxAgenciesPerDistrict) {
        return { 
          success: false, 
          message: `District ${agencyDistrict} already has ${agencyCount} agencies, which exceeds the limit of ${maxAgenciesPerDistrict}.` 
        };
      }

      agency.name = agencyName;
      agency.type = agencyType;
      agency.address = agencyAddress;
      agency.district = agencyDistrict;
      agency.receptionDate = onboardDate;
      agency.phone = agencyPhone;
      agency.email = agencyEmail;
      agency.currentDebt = agencyDebt;

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
      const agency = await Agency.findOne({
        where: {
          agencyCode: agencyCode,
        },
      });

      if (!agency) {
        return { success: false, message: 'Agency not found' };
      }
      
      await agency.destroy();

      return { success: true, message: 'Agency deleted successfully' };

    } catch (error) {
      console.error('Error deleting agency:', error);
      return { success: false, message: 'An error occurred while deleting the agency' };
    }
  }
}

module.exports = EditAgency;
