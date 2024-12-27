const { Agency } = require('../models/agency');
const { Regulation } = require('../models/regulation');

const addAgency = async (agencyData) => {
    const { body: { name, phone, email, type, address, onboardDate, district } } = agencyData;
    try {
        const regulation = await Regulation.findOne();
        const maxAgenciesPerDistrict = regulation ? regulation.maxAgenciesPerDistrict : 4;

        const agencyCountInDistrict = await Agency.count({ where: { district } });

        if (agencyCountInDistrict >= maxAgenciesPerDistrict) {
            return { success: false, message: `The number of agencies in the current district has exceeded the allowed limit of ${maxAgenciesPerDistrict}!` };
        }

        const lastAgency = await Agency.findOne({
            order: [['agencyCode', 'DESC']],
            attributes: ['agencyCode']
        });

        const nextNumber = lastAgency ? parseInt(lastAgency.agencyCode.substring(2)) + 1 : 1;
        const agencyCode = `AG${nextNumber.toString().padStart(3, '0')}`;

        const existingAgency = await Agency.findOne({ where: { name } });
        if (existingAgency) {
            return { success: false, message: 'An agency with this name already exists.' };
        }

        await Agency.create({
            agencyCode,
            name,
            phone,
            email,
            type,
            address,
            onboardDate,
            district
        });

        const agencies = await Agency.findAll();
        return { success: true, agencies };
    } catch (error) {
        console.error('Error in addAgency:', error);
        return { success: false, message: `Error adding agency: ${error.message}` };
    }
}

module.exports = { addAgency };
