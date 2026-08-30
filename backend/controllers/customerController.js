const { customers } = require('../data/mockData');

const listCustomers = (req, res) => {
  return res.json(customers);
};

module.exports = {
  listCustomers,
};
