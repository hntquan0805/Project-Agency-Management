// Import model Regulation (giả sử bạn đã định nghĩa mô hình Regulation)
const { Regulation } = require('../models/regulation');
const { Agency } = require('../models/agency');
const { AgencyType } = require('../models/agencyType');
const { Sequelize } = require('sequelize');

// Hàm cập nhật cài đặt
async function updateSettings(updateData) {
    try {
        // Truy cập vào model Regulation để tìm đối tượng Regulation (có thể có nhiều đối tượng hoặc chỉ một)
        // Giả sử bạn chỉ có một bản ghi duy nhất trong bảng Regulation

        const regulation = await Regulation.findOne();

        if (!regulation) {
            throw new Error('Không tìm thấy cài đặt nào để cập nhật');
        }

        // Kiểm tra nếu số maxAgenciesPerDistrict hiện tại lớn hơn maxAgentsInDistrict
        if (regulation.maxAgenciesPerDistrict > updateData.maxAgentsInDistrict) {
            // Truy vấn để lấy danh sách các quận có số đại lý vượt quá giới hạn
            const districtsExceedingLimit = await Agency.findAll({
                attributes: [
                    'district',
                    [Sequelize.fn('COUNT', Sequelize.col('agencyCode')), 'agencyCount'] // Đếm số đại lý trong mỗi quận
                ],
                group: ['district'], // Nhóm theo quận
                having: Sequelize.literal('COUNT(agencyCode) > ' + updateData.maxAgentsInDistrict), // Lọc các quận có số đại lý vượt quá giới hạn
            });

            // Nếu có quận nào vi phạm giới hạn
            if (districtsExceedingLimit.length > 0) {
                const districtNames = districtsExceedingLimit.map(district => district.district).join(', ');
                return {
                    success: false,
                    message: `CẢNH BÁO! Các quận sau đang có số đại lý nhiều hơn giới hạn: ${districtNames}`
                };
            }
        }

        if (regulation.agencyTypeCount > updateData.numAgentTypes) {
            // Lấy danh sách tất cả các loại đại lý
            const agencyTypes = await AgencyType.findAll();
        
            // Kiểm tra các loại đại lý không có đại lý nào thuộc về
            const emptyAgencyTypes = [];
        
            for (const agencyType of agencyTypes) {
                const count = await Agency.count({
                    where: { type: agencyType.type },
                });
        
                if (count === 0) {
                    emptyAgencyTypes.push(agencyType);
                }
            }
        
            // Nếu không có loại đại lý nào không có đại lý thuộc về
            if (emptyAgencyTypes.length === 0) {
                return {
                    success: false,
                    message: 'Hiện đang tồn tại nhiều hơn ' + ' loại đại lí.',
                };
            }
        
            // Tính toán chênh lệch giữa numAgentTypes và agencyTypeCount
            const difference = regulation.agencyTypeCount - updateData.numAgentTypes;
        
            // Nếu chênh lệch quá lớn so với số loại đại lý trống, không thể xoá
            if (difference > emptyAgencyTypes.length) {
                return {
                    success: false,
                    message: 'Chênh lệch quá lớn so với số loại đại lý trống, không thể xoá.',
                };
            }
        
            // Sắp xếp theo thứ tự giảm dần (loại đại lý có type lớn hơn sẽ được xóa trước)
            const sortedEmptyAgencyTypes = emptyAgencyTypes.sort((a, b) => b.type - a.type);
        
            // Lấy ra đúng số loại đại lý cần xóa theo số lượng chênh lệch
            const typesToDelete = sortedEmptyAgencyTypes.slice(0, difference);
        
            // Xóa các loại đại lý không có đại lý nào thuộc về
            await AgencyType.destroy({
                where: {
                    type: {
                        [Sequelize.Op.in]: typesToDelete.map(type => type.type),
                    }
                }
            });
        
            // Cập nhật lại agencyTypeCount trong regulation
            regulation.agencyTypeCount = updateData.numAgentTypes;
            regulation.maxAgenciesPerDistrict = updateData.maxAgentsInDistrict;
            await regulation.save();
        
            return {
                success: true,
                message: 'Đã xóa các loại đại lý không có đại lý và cập nhật lại Số loại đại lí.',
                updatedSettings: regulation
            };
        }
        
        const typesToCreate = [];
            for (let i = regulation.agencyTypeCount + 1; i <= updateData.numAgentTypes; i++) {
                typesToCreate.push({
                    type: i,
                    productCount: 5,   // Giả sử productCount là 5 cho các loại mới
                    unitCount: 3,      // Giả sử unitCount là 3 cho các loại mới
                    maxDebt: 0         // Giả sử maxDebt là 0 cho các loại mới
                });
            }

            // Tạo các loại đại lý mới
            await AgencyType.bulkCreate(typesToCreate);

        // Cập nhật các trường dữ liệu trong Regulation
        regulation.agencyTypeCount = updateData.numAgentTypes;
        regulation.maxAgenciesPerDistrict = updateData.maxAgentsInDistrict;

        // Lưu lại bản ghi đã cập nhật
        await regulation.save();

        // Trả về kết quả thành công
        return {
            success: true,
            updatedSettings: regulation // Trả về cài đặt đã được cập nhật
        };
    } catch (error) {
        console.error('Error updating settings:', error);
        return { success: false, message: 'Lỗi khi cập nhật cài đặt' };
    }
}

module.exports = { updateSettings };
