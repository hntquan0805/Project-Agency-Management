const { Agency } = require('../models/agency');
const { Regulation } = require('../models/regulation');

async function addAgency(agencyData) {
    const { body: { name, phone, email, type, address, onboardDate, district } } = agencyData;
    try {
        const regulation = await Regulation.findOne();
        const maxAgenciesPerDistrict = regulation ? regulation.maxAgenciesPerDistrict : 4;

        const agencyCountInDistrict = await Agency.count({ where: { district } });

        if (agencyCountInDistrict >= maxAgenciesPerDistrict) {
            return { success: false, message: `The number of agencies in the current district has exceeded the allowed limit of ${maxAgenciesPerDistrict}!` };
        }

        // Get the largest agencyCode currently to generate the new code
        const lastAgency = await Agency.findOne({
            order: [['agencyCode', 'DESC']],
            attributes: ['agencyCode']
        });

        const nextNumber = lastAgency ? parseInt(lastAgency.agencyCode.substring(2)) + 1 : 1;
        const agencyCode = `AG${nextNumber.toString().padStart(3, '0')}`;

        // Check if the agency already exists
        const existingAgency = await Agency.findOne({ where: { name } });
        if (existingAgency) {
            return { success: false, message: 'An agency with this name already exists.' };
        }

        // Add the new agency
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

        // Get all agencies and convert them to plain objects
        const agencies = await Agency.findAll();
        return { success: true, agencies };
    } catch (error) {
        console.error('Error in addAgency:', error);
        return { success: false, message: `Error adding agency: ${error.message}` };
    }
}

module.exports = { addAgency };
