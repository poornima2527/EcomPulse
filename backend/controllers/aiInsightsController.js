const { aiInsights } = require('../data/mockData');

const getInsights = (req, res) => {
  return res.json(aiInsights);
};

module.exports = {
  getInsights,
};
