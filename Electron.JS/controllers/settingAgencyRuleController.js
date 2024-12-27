const { Regulation } = require('../models/regulation');
const { Agency } = require('../models/agency');
const { AgencyType } = require('../models/agencyType');
const { Sequelize } = require('sequelize');

async function updateSettings(updateData) {
    try {
        const regulation = await Regulation.findOne();

        if (!regulation) {
            throw new Error('No settings found to update');
        }

        if (regulation.maxAgenciesPerDistrict > updateData.maxAgentsInDistrict) {
            const districtsExceedingLimit = await Agency.findAll({
                attributes: [
                    'district',
                    [Sequelize.fn('COUNT', Sequelize.col('agencyCode')), 'agencyCount']
                ],
                group: ['district'],
                having: Sequelize.literal('COUNT(agencyCode) > ' + updateData.maxAgentsInDistrict),
            });

            if (districtsExceedingLimit.length > 0) {
                const districtNames = districtsExceedingLimit.map(district => district.district).join(', ');
                return {
                    success: false,
                    message: `WARNING! The following districts have more agencies than the limit: ${districtNames}`
                };
            }
        }

        if (regulation.agencyTypeCount > updateData.numAgentTypes) {
            const agencyTypes = await AgencyType.findAll();
        
            const emptyAgencyTypes = [];
        
            for (const agencyType of agencyTypes) {
                const count = await Agency.count({
                    where: { type: agencyType.type },
                });
        
                if (count === 0) {
                    emptyAgencyTypes.push(agencyType);
                }
            }

            if (emptyAgencyTypes.length === 0) {
                return {
                    success: false,
                    message: 'There are more agency types than expected.'
                };
            }

            const difference = regulation.agencyTypeCount - updateData.numAgentTypes;

            if (difference > emptyAgencyTypes.length) {
                return {
                    success: false,
                    message: 'The difference is too large compared to the number of empty agency types, cannot delete.'
                };
            }

            const sortedEmptyAgencyTypes = emptyAgencyTypes.sort((a, b) => b.type - a.type);

            const typesToDelete = sortedEmptyAgencyTypes.slice(0, difference);

            await AgencyType.destroy({
                where: {
                    type: {
                        [Sequelize.Op.in]: typesToDelete.map(type => type.type),
                    }
                }
            });
        
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
                    productCount: 5,
                    unitCount: 3,
                    maxDebt: 0
                });
            }

            await AgencyType.bulkCreate(typesToCreate);

        regulation.agencyTypeCount = updateData.numAgentTypes;
        regulation.maxAgenciesPerDistrict = updateData.maxAgentsInDistrict;

        await regulation.save();

        return {
            success: true,
            updatedSettings: regulation
        };
    } catch (error) {
        console.error('Error updating settings:', error);
        return { success: false, message: 'Error updating settings' };
    }
}

module.exports = { updateSettings };
