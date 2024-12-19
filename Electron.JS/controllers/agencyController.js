const { Agency } = require('../models/agency');  // Đảm bảo đã import model Agency

// Hàm thêm một đại lý vào cơ sở dữ liệu
async function addAgency(agencyData) {
    const { name, phone, email, type, address, onboardDate, district } = agencyData;  // Lấy dữ liệu từ yêu cầu (request)

    try {
        // Tìm đại lý có mã agentCode lớn nhất
        const lastAgency = await db.Agency.findOne({
            order: [['agentCode', 'DESC']], // Sắp xếp theo agentCode giảm dần để lấy mã cuối cùng
            attributes: ['agentCode']  // Chỉ lấy trường agentCode
        });

        // Lấy số thứ tự tiếp theo của agentCode, nếu không có đại lý nào thì bắt đầu từ 1
        const nextNumber = lastAgency ? parseInt(lastAgency.agentCode.substring(2)) + 1 : 1;

        // Tạo agentCode mới theo mẫu 'AG***'
        const agentCode = `AG${nextNumber.toString().padStart(3, '0')}`;

        // Kiểm tra xem đại lý đã tồn tại chưa (có thể dựa vào `email` hoặc `phone` nếu cần)
        const existingAgency = await Agency.findOne({ where: { email } });
        if (existingAgency) {
            return { success: false, message: 'Đại lý đã tồn tại với email này.' };
        }

        // Tạo đại lý mới
        const newAgency = await Agency.create({
            agentCode,  // Sử dụng agentCode đã tạo
            name,
            phone,
            email,
            type,
            address,
            onboardDate,
            district
        });

        // Trả về thông báo thành công và thông tin đại lý đã tạo
        return { success: true, agency: newAgency };
    } catch (error) {
        // Xử lý lỗi
        console.error('Error in addAgency:', error);
        return { success: false, message: `Lỗi khi thêm đại lý: ${error.message}` };
    }
}

module.exports = { addAgency };