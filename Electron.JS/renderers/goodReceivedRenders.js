
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
                <p><strong>Supplier Name:</strong> <span>${agentName}</span></p>
                <p><strong>Email:</strong> <span>${email}</span></p>
                <p><strong>Phone Number:</strong> <span>${phoneNumber}</span></p>
                <p><strong>Address:</strong> <span>${address}</span></p>
                <p><strong>Payment: </strong></p>
                <p><strong>Amount Paid:</strong> <span>${amount}</span></p>
                <p><strong>Date:</strong> <span>${date}</span></p>
                <p><strong>Received By:</strong> <span>Admin</span></p>
                
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
            const printContent = document.querySelector('.result-container').outerHTML; // Lấy toàn bộ HTML của result-container
            const originalContent = document.body.innerHTML; // Lưu nội dung gốc của trang
        
            // Tạo nội dung trang in với định dạng giống result-container
            document.body.innerHTML = `
                <html>
                    <head>
                        <title>Print</title>
                        <style>
                            /* Áp dụng CSS cho định dạng in */
                            body {
                                font-family: Arial, sans-serif;
                                margin: 0;
                                padding: 20px;
                                background-color: #f0f0f0;
                            }
                            .result-container {
                                background-color: white;
                                border-radius: 5px;
                                box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
                                padding: 20px;
                                width: 60%;
                                margin: auto;
                            }
                            h3 {
                                text-align: center;
                                font-size: 20px;
                                font-weight: bold;
                                text-transform: uppercase;
                                margin-bottom: 20px;
                            }
                            p {
                                margin: 10px 0;
                                font-size: 14px;
                            }
                            p strong {
                                display: inline-block;
                                width: 150px; /* Căn chỉnh tên input */
                                text-align: left;
                            }
                            p span {
                                text-decoration: underline;
                                text-underline-offset: 5px;
                                text-decoration-color: #d3d3d3;
                            }
                        </style>
                    </head>
                    <body>
                        ${printContent} <!-- Nội dung in từ result-container -->
                    </body>
                </html>
            `;
        
            window.print(); // Thực hiện in
        
            document.body.innerHTML = originalContent; // Khôi phục nội dung gốc sau khi in
            window.location.reload(); // Tải lại trang để tránh lỗi
        });
        
    });

