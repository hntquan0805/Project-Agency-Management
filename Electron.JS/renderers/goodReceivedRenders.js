
    document.querySelector('.createButton').addEventListener('click', function (e) {
        e.preventDefault(); // Ngăn form reload trang

        // Thu thập dữ liệu từ form
        const agentName = document.getElementById('agentName').value;
        const address = document.getElementById('address').value;
        const phoneNumber = document.getElementById('phoneNumber').value;
        const email = document.getElementById('email').value;
        const date = document.getElementById('date').value;
        const amount = document.getElementById('amount').value;

        // Tạo bảng thông tin
        const resultHtml = `
            <div class = "result">
                <h2>GOODS RECEIVED NOTE</h2>
            <div class="result-container">
                
                <h3>GOODS RECEIVED NOTE</h3>
                <p><strong>Information: </strong></p>
                <p><strong>Supplier Name:</strong> ${agentName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone Number:</strong> ${phoneNumber}</p>
                <p><strong>Address:</strong> ${address}</p>
                <p><strong>Payment: </strong></p>
                <p><strong>Amount Paid:</strong> ${amount} VND</p>
                <p><strong>Date:</strong> ${date}</p>
                <p><strong>Received By:</strong> Admin</p>
                
            </div>
            <div class="button-group">
                    <button class="closeButton">Close <i class="bi bi-x"></i></button>
                    <button class="printButton">Print <i class="bi bi-printer-fill"></i></button>
                </div>
            </div>
        `;

        // Hiển thị kết quả trên màn hình
        const main = document.querySelector('.main');
        main.innerHTML = resultHtml;

        // Xử lý sự kiện nút Close
        document.querySelector('.closeButton').addEventListener('click', function () {
            window.location.reload(); // Tải lại trang
        });

        // Xử lý sự kiện nút Print
        document.querySelector('.printButton').addEventListener('click', function () {
            window.print(); // In trang
        });
    });

