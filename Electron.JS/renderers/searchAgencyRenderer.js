document.getElementById('search-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('agentName').value;
  const type = document.getElementById('type').value;
  const district = document.getElementById('district').value;

  const filters = {};
  if (type) filters.type = type;
  if (district) filters.district = district;

  const results = await window.api.searchAgencies({ name, filters });

  const resultsTable = document.getElementById('results');
  resultsTable.innerHTML = '';
  results.forEach(agency => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${agency.name}</td>
      <td>${agency.description}</td>
      <td>$${agency.price}</td>
    `;
    resultsTable.appendChild(row);
  });
});