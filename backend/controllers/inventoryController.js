const { inventory } = require('../data/mockData');

const listInventory = (req, res) => {
  return res.json(inventory);
};

const restockItem = (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  const item = inventory.find((entry) => entry.id === id);

  if (!item) {
    return res.status(404).json({ message: 'Inventory item not found' });
  }

  item.currentStock += Number(quantity || 0);
  item.status = item.currentStock > item.reorderLevel ? 'Healthy' : 'Low Stock';
  item.lastUpdated = new Date().toISOString().slice(0, 10);

  return res.json(item);
};

module.exports = {
  listInventory,
  restockItem,
};
