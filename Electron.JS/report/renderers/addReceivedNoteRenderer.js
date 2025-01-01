document.addEventListener('DOMContentLoaded', async () => {
    document.querySelector(".result").style.display = 'none';
    document.querySelector(".popup_hidden").style.display = 'none';
}),

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

    if (result.success) {
        const spans = document.querySelectorAll(".result .result-container p span");
        if (spans.length === 7) {
            spans[0].textContent = agencyName;
            spans[1].textContent = email;
            spans[2].textContent = phoneNumber;
            spans[3].textContent = address;
            spans[4].textContent = amount + " VND";
            
            const formattedDate = new Date(date);
            const day = String(formattedDate.getDate()).padStart(2, '0');
            const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
            const year = formattedDate.getFullYear();
            const formattedDateString = `${day}/${month}/${year}`;
            
            spans[5].textContent = formattedDateString;
            spans[6].textContent = "Admin";

            document.querySelector(".result").style.display = 'block';
            document.querySelector(".goodReceived").style.display = 'none';

            document.querySelector(".closeButton").addEventListener('click', function() {
                document.querySelector(".result").style.display = 'none';
                document.querySelector(".goodReceived").style.display = 'block';
            });

            document.querySelector(".printButton").addEventListener('click', function() {
                window.print();
            });
        } else {
            console.log('Cannot find members in span.');
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