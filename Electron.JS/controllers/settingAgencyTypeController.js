const { AgencyType } = require('../models/agencytype');

const updateAgencyTypeSettings = async (updateData) => {
    try {
        const agencyType = await AgencyType.findOne({
            where: {
                type: updateData.agencyType
            }
        });

        if (!agencyType) {
            return { success: false, message: 'Agency type does not exist.' };
        }

        agencyType.maxDebt = updateData.inputMaximumDebt;
        agencyType.productCount = updateData.inputMaxGoodsPerBill;

        await agencyType.save();

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

const getAgencyTypesFromDB = async () => {
    try {
        const agencyTypes = await AgencyType.findAll({
            attributes: ['type']
        });
        console.log(agencyTypes.map(agencyType => agencyType.type));
        return agencyTypes.map(agencyType => agencyType.type);
    } catch (error) {
        console.error('Error fetching agency types:', error);
        return [];
    }
}

module.exports = { updateAgencyTypeSettings, getAgencyTypesFromDB };
