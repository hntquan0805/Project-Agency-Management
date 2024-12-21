const { Agency } = require('../models/agency');

function searchAgencies(criteria) {
  try {
    const { name, filters } = criteria;
    const where = {};
    if (name) where.name = { [Op.like]: `%${name}%` };
    if (filters) {
      if (filters.type) where.type = filters.type;
      if (filters.district) where.district = filters.district;
    }

    return Agency.findAll({ where });

  } catch (error) {
    console.error('Error:', error);
  }
}

module.exports =  { searchAgencies };