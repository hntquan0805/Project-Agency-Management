document.getElementById('search-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('agentName').value;
  const type = document.getElementById('type').value;
  const district = document.getElementById('district').value;

  let serial_t = 1;

  const filters = {};
  if (type) filters.type = type;
  if (district) filters.district = district;

  const results = await window.api.searchAgencies({name, filters});
  
  const resultsTable = document.getElementById('results');
  resultsTable.innerHTML = '';
  results.forEach(agency => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <th>${serial_t++}</th>
      <th>${agency.dataValues.name}</th>
      <th>${agency.dataValues.type}</th>
      <th>${agency.dataValues.district}</th>
      <th>${agency.dataValues.currentDebt}</th>
      <th><button class="fix-button" title="Edit"><i class="fa-solid fa-pen"></i></button></th>
      <th><button class="delete-button" title="Delete"><i class="fa-solid fa-trash"></i></button></th>
    `;
    resultsTable.appendChild(row);
    row.dataset.agencyCode = agency.dataValues.agencyCode;
    row.dataset.phone = agency.dataValues.phone;
    row.dataset.onboardDate = agency.dataValues.onboardDate;
    row.dataset.email = agency.dataValues.email;
    row.dataset.address = agency.dataValues.address;
  });

  const editButtons = document.querySelectorAll('.fix-button');
  const editPopUp = document.getElementById("edit-agency-pop-up");
  const overlay = document.getElementById("overlay");
  const closePopUpButton = document.getElementById("close-pop-up-button");

  editButtons.forEach(button => {
    button.addEventListener("click", function(event) {
      // Lấy dữ liệu từ dòng hiện tại (dòng của agency được chọn)
      const row = event.target.closest("tr");
      
      const cells = row.children; // Lấy tất cả các phần tử <td> trong row
      const agencyCode = row.dataset.agencyCode;
      const phone = row.dataset.phone;
      const onboardDate = row.dataset.onboardDate;
      const email = row.dataset.email;
      const address = row.dataset.address;
      const agencyName = cells[1].textContent;
      const type = cells[2].textContent;
      const district = cells[3].textContent;
      const debt = cells[4].textContent;
      
      // In ra giá trị để kiểm tra
      console.log("Serial:", agencyCode);
      console.log("Agency Name:", agencyName);
      console.log("Type:", type);
      console.log("District:", district);
      console.log("Debt:", debt);

      // Điền thông tin vào các trường trong form pop-up
      document.getElementById('agency-serial').value = agencyCode;
      document.getElementById('agency-name').value = agencyName;
      document.getElementById('agency-type').value = type;
      document.getElementById('agency-address').value = address;
      document.getElementById('agency-district').value = district;
      document.getElementById('reception-date').value = onboardDate;
      document.getElementById('agency-phone').value = phone;
      document.getElementById('agency-email').value = email;
      document.getElementById('agency-debt').value = debt;

      // Hiển thị Pop-up và overlay
      document.getElementById('edit-agency-pop-up').style.display = "block";
      document.getElementById('overlay').style.display = "block";
    });
  });

  // Đóng pop-up khi nhấn nút đóng
  closePopUpButton.addEventListener("click", function() {
    editPopUp.style.display = "none";
    overlay.style.display = "none";
  });

  // Đóng pop-up khi nhấn vào overlay
  overlay.addEventListener("click", function() {
    editPopUp.style.display = "none";
    overlay.style.display = "none";
  });

});

