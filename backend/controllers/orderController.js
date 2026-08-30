const { orders } = require('../data/mockData');

const listOrders = (req, res) => {
  return res.json(orders);
};

const updateOrderStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const order = orders.find((entry) => entry.id === id);

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  order.status = status;
  return res.json(order);
};

module.exports = {
  listOrders,
  updateOrderStatus,
};
