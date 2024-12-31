document.getElementById('create-received-note').addEventListener('click', async function(event) {
    event.preventDefault();
    const agencyName = document.getElementById("agentName").value;
    const address = document.getElementById("address").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const email = document.getElementById("email").value;
    const date = document.getElementById("date").value;
    const amount = document.getElementById("amount").value;

    const formData = {
        agencyName,
        address,
        phoneNumber,
        email,
        date,
        amount
    };

    const result = await window.api.saveGoodsReceivedNote(formData);

    // Kiểm tra nếu việc lưu thành công
    if (result.success) {
        const spans = document.querySelectorAll(".result .result-container p span");
        if (spans.length === 7) { // Điều chỉnh cho 7 phần tử <span> (bao gồm 'Received By')
            spans[0].textContent = agencyName;
            spans[1].textContent = email;
            spans[2].textContent = phoneNumber;
            spans[3].textContent = address;
            spans[4].textContent = amount + " VND";
            
            // Định dạng ngày thành dd/mm/yyyy
            const formattedDate = new Date(date);
            const day = String(formattedDate.getDate()).padStart(2, '0'); // Đảm bảo 2 chữ số cho ngày
            const month = String(formattedDate.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0, nên cộng thêm 1
            const year = formattedDate.getFullYear();
            const formattedDateString = `${day}/${month}/${year}`;
            
            spans[5].textContent = formattedDateString;
            spans[6].textContent = "Admin"; // Hoặc sử dụng dữ liệu phù hợp từ form

            // Hiển thị phần tử .result
            document.querySelector(".result").style.display = 'block';
            document.querySelector(".goodReceived").style.display = 'none'; // Ẩn form

            // Thêm sự kiện cho nút Close
            document.querySelector(".closeButton").addEventListener('click', function() {
                document.querySelector(".result").style.display = 'none';
                document.querySelector(".goodReceived").style.display = 'block'; // Hiện lại form
            });

            // Thêm sự kiện cho nút Print
            document.querySelector(".printButton").addEventListener('click', function() {
                window.print(); // In trang hiện tại
            });
        } else {
            console.log('Không tìm thấy đủ các phần tử span.');
        }
    } else {
        const failurePopup = document.getElementById("failurePopup");
        failurePopup.style.display = "block"; // Hiển thị popup lỗi

        // Thêm sự kiện cho nút đóng popup
        document.getElementById("closePopupButton").addEventListener("click", function() {
            failurePopup.style.display = "none"; // Ẩn popup khi nhấn Close
        });
    }
})