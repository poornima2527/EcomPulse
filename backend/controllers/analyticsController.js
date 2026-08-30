const { analytics } = require('../data/mockData');

const getAnalytics = (req, res) => {
  return res.json(analytics);
};

module.exports = {
  getAnalytics,
};
