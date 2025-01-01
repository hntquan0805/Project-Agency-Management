document.getElementById('search-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('agentName').value;
  const type = document.getElementById('type').value;
  const district = document.getElementById('district').value;

  let serial_t = 1;

  const filters = {};
  if (type) filters.type = type;
  if (district) filters.district = district;

  async function loadProducts() {
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

    document.querySelectorAll('.delete-button').forEach(button => {
      button.addEventListener('click', async (event) => {
          if (confirm('Are you sure you want to delete this agency?')) {
            const row = event.target.closest("tr");
            const agencyCode = row.dataset.agencyCode;
            await window.api.deleteAgency(agencyCode);
            loadProducts();
          }
      });
    });

    const editButtons = document.querySelectorAll('.fix-button');
    const editPopUp = document.getElementById("edit-agency-pop-up");
    const overlay = document.getElementById("overlay");
    const closePopUpButton = document.getElementById("close-pop-up-button");

    editButtons.forEach(button => {
      button.addEventListener("click", function(event) {
        const row = event.target.closest("tr");
        
        const cells = row.children;
        const agencyCode = row.dataset.agencyCode;
        const phone = row.dataset.phone;
        const onboardDate = row.dataset.onboardDate;
        const email = row.dataset.email;
        const address = row.dataset.address;
        const agencyName = cells[1].textContent;
        const type = cells[2].textContent;
        const district = cells[3].textContent;
        const debt = cells[4].textContent;

        document.getElementById('agency-serial').value = agencyCode;
        document.getElementById('agency-name').value = agencyName;
        document.getElementById('agency-type').value = type;
        document.getElementById('agency-address').value = address;
        document.getElementById('agency-district').value = district;
        document.getElementById('reception-date').value = onboardDate;
        document.getElementById('agency-phone').value = phone;
        document.getElementById('agency-email').value = email;
        document.getElementById('agency-debt').value = debt;

        document.getElementById('edit-agency-pop-up').style.display = "block";
        document.getElementById('overlay').style.display = "block";
      });
    });

    closePopUpButton.addEventListener("click", function() {
      editPopUp.style.display = "none";
      overlay.style.display = "none";
    });

    overlay.addEventListener("click", function() {
      editPopUp.style.display = "none";
      overlay.style.display = "none";
    });
  }
  loadProducts();
});

