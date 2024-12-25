const { Regulation } = require('../models/regulation');
const { Agency } = require('../models/agency');
const { AgencyType } = require('../models/agencyType');
const { Sequelize } = require('sequelize');

// Update settings function
async function updateSettings(updateData) {
    try {
        // Access the Regulation model to find the Regulation object (could be multiple or just one)
        // Assuming you only have one record in the Regulation table

        const regulation = await Regulation.findOne();

        if (!regulation) {
            throw new Error('No settings found to update');
        }

        // Check if the current maxAgenciesPerDistrict is greater than maxAgentsInDistrict
        if (regulation.maxAgenciesPerDistrict > updateData.maxAgentsInDistrict) {
            // Query to get the list of districts with more agencies than the limit
            const districtsExceedingLimit = await Agency.findAll({
                attributes: [
                    'district',
                    [Sequelize.fn('COUNT', Sequelize.col('agencyCode')), 'agencyCount'] // Count agencies in each district
                ],
                group: ['district'], // Group by district
                having: Sequelize.literal('COUNT(agencyCode) > ' + updateData.maxAgentsInDistrict), // Filter districts exceeding the limit
            });

            // If there are any districts exceeding the limit
            if (districtsExceedingLimit.length > 0) {
                const districtNames = districtsExceedingLimit.map(district => district.district).join(', ');
                return {
                    success: false,
                    message: `WARNING! The following districts have more agencies than the limit: ${districtNames}`
                };
            }
        }

        if (regulation.agencyTypeCount > updateData.numAgentTypes) {
            // Get the list of all agency types
            const agencyTypes = await AgencyType.findAll();
        
            // Check for agency types that don't have any agencies assigned
            const emptyAgencyTypes = [];
        
            for (const agencyType of agencyTypes) {
                const count = await Agency.count({
                    where: { type: agencyType.type },
                });
        
                if (count === 0) {
                    emptyAgencyTypes.push(agencyType);
                }
            }
        
            // If there are no agency types with no agencies assigned
            if (emptyAgencyTypes.length === 0) {
                return {
                    success: false,
                    message: 'There are more agency types than expected.'
                };
            }
        
            // Calculate the difference between numAgentTypes and agencyTypeCount
            const difference = regulation.agencyTypeCount - updateData.numAgentTypes;
        
            // If the difference is too large compared to the number of empty agency types, deletion is not possible
            if (difference > emptyAgencyTypes.length) {
                return {
                    success: false,
                    message: 'The difference is too large compared to the number of empty agency types, cannot delete.'
                };
            }
        
            // Sort by descending order (agency types with a higher type will be deleted first)
            const sortedEmptyAgencyTypes = emptyAgencyTypes.sort((a, b) => b.type - a.type);
        
            // Get the required number of agency types to delete based on the difference
            const typesToDelete = sortedEmptyAgencyTypes.slice(0, difference);
        
            // Delete agency types with no agencies assigned
            await AgencyType.destroy({
                where: {
                    type: {
                        [Sequelize.Op.in]: typesToDelete.map(type => type.type),
                    }
                }
            });
        
            // Update the agencyTypeCount in the regulation
            regulation.agencyTypeCount = updateData.numAgentTypes;
            regulation.maxAgenciesPerDistrict = updateData.maxAgentsInDistrict;
            await regulation.save();
        
            return {
                success: true,
                message: 'Deleted empty agency types and updated the number of agency types.',
                updatedSettings: regulation
            };
        }
        
        const typesToCreate = [];
            for (let i = regulation.agencyTypeCount + 1; i <= updateData.numAgentTypes; i++) {
                typesToCreate.push({
                    type: i,
                    productCount: 5,   // Assuming productCount is 5 for new types
                    unitCount: 3,      // Assuming unitCount is 3 for new types
                    maxDebt: 0         // Assuming maxDebt is 0 for new types
                });
            }

            // Create new agency types
            await AgencyType.bulkCreate(typesToCreate);

        // Update fields in Regulation
        regulation.agencyTypeCount = updateData.numAgentTypes;
        regulation.maxAgenciesPerDistrict = updateData.maxAgentsInDistrict;

        // Save the updated record
        await regulation.save();

        // Return success
        return {
            success: true,
            updatedSettings: regulation // Return the updated settings
        };
    } catch (error) {
        console.error('Error updating settings:', error);
        return { success: false, message: 'Error updating settings' };
    }
}

module.exports = { updateSettings };
