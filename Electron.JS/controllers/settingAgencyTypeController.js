// Import model Regulation (assuming you have defined the Regulation model)
const { Regulation } = require('../models/regulation');
const { Agency } = require('../models/agency');
const { AgencyType } = require('../models/agencyType');
const { Sequelize } = require('sequelize');

// Update settings function
async function updateAgencyTypeSettings(updateData) {
    try {
        // Find agency type by type in updateData
        const agencyType = await AgencyType.findOne({
            where: {
                type: updateData.agencyType
            }
        });

        // If not found, return an error
        if (!agencyType) {
            return { success: false, message: 'Agency type does not exist.' };
        }

        // Update maxDebt and unitCount fields
        agencyType.maxDebt = updateData.inputMaximumDebt;
        agencyType.productCount = updateData.inputMaxGoodsPerBill;

        // Save changes to the database
        await agencyType.save();

        // Return success
        return {
            success: true,
            message: 'Update successful.',
            updatedAgencyType: agencyType
        };
    } catch (error) {
        console.error('Error updating settings:', error);
        return { success: false, message: 'Error updating settings' };
    }
}

// Function to query the database to get the list of agency types
async function getAgencyTypesFromDB() {
    try {
        // Query all agency types from the database
        const agencyTypes = await AgencyType.findAll({
            attributes: ['type']  // Only get the `type` field
        });
        console.log(agencyTypes.map(agencyType => agencyType.type));
        return agencyTypes.map(agencyType => agencyType.type);
    } catch (error) {
        console.error('Error fetching agency types:', error);
        return [];  // Return an empty array if there is an error
    }
}

module.exports = { updateAgencyTypeSettings, getAgencyTypesFromDB };
