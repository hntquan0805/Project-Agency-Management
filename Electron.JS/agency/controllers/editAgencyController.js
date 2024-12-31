const { Agency } = require('../../models/agency');

// Hàm updateAgency
const updateAgency = async (agencyData) => {
  const { agencyCode, agencyName, agencyType, agencyDistrict, agencyDebt } = agencyData;
  console.log(agencyCode);
  try {
    const agency = await Agency.findOne({
        where: {
            agencyCode: agencyCode,
          }
    });

    if (!agency) {
      return { success: false, message: 'Agency not found' };
    }

    agency.name = agencyName;
    agency.type = agencyType;
    agency.district = agencyDistrict;
    agency.currentDebt = agencyDebt;

    await agency.save();

    return { success: true, message: 'Agency updated successfully' };

  } catch (error) {
    console.error('Error updating agency:', error);
    return { success: false, message: 'An error occurred while updating the agency' };
  }
}

module.exports = updateAgency;
