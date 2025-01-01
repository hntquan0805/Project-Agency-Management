const { Agency } = require('../../models/agency');
const { Regulation } = require('../../models/regulation');

class _Agency {
static addAgency = async (agencyData) => {
    const { body: { name, phone, email, type, address, onboardDate, district } } = agencyData;
    try {
        const regulation = await Regulation.findOne();
        const maxAgenciesPerDistrict = regulation ? regulation.maxAgenciesPerDistrict : 4;

        const agencyCountInDistrict = await Agency.count({ where: { district } });

        if (agencyCountInDistrict >= maxAgenciesPerDistrict) {
            return { success: false, message: `Current district has exceeded the allowed limit of ${maxAgenciesPerDistrict}!` };
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

static get_agency_code = async (name) => {
    try {
        const agencyCode = await Agency.findOne({
            where: { name: name },
            attributes: ['agencyCode']
        });
        return agencyCode;
    } catch (error) {
        console.error('Error fetching agency types:', error);
        return [];
    }
}
};

module.exports = _Agency;
