const { Agency } = require('../../models/agency');

const getAllAgencies = async () => {
    try {
      const agencies = await Agency.findAll();
      return agencies;
    } catch (error) {
      console.error('Error fetching agency data:', error);
      throw new Error('Failed to fetch agency data');
    }
}
module.exports = { getAllAgencies };
  