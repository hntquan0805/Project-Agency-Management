const { Agency } = require('../models/agency');

async function addAgency(agencyData) {
    const { body: { name, phone, email, type, address, onboardDate, district } } = agencyData;
    try {
        // Lấy agencyCode lớn nhất hiện tại để tạo mã mới
        const lastAgency = await Agency.findOne({
            order: [['agencyCode', 'DESC']],
            attributes: ['agencyCode']
        });

        const nextNumber = lastAgency ? parseInt(lastAgency.agencyCode.substring(2)) + 1 : 1;
        const agencyCode = `AG${nextNumber.toString().padStart(3, '0')}`;

        // Kiểm tra đại lý có tồn tại không
        const existingAgency = await Agency.findOne({ where: { name } });
        if (existingAgency) {
            return { success: false, message: 'Đại lý đã tồn tại với tên này.' };
        }

        // Thêm đại lý mới
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

        // Lấy tất cả các đại lý và chuyển đổi thành object thuần túy
        const agencies = await Agency.findAll();
        return { success: true, agencies};
    } catch (error) {
        console.error('Error in addAgency:', error);
        return { success: false, message: `Lỗi khi thêm đại lý: ${error.message}` };
    }
}

module.exports = { addAgency };
