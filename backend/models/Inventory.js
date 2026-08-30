const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema(
  {
    sku: { type: String, required: true, unique: true },
    product: { type: String, required: true },
    category: { type: String, required: true },
    currentStock: { type: Number, required: true },
    reorderLevel: { type: Number, default: 0 },
    status: { type: String, default: 'Healthy' },
    location: { type: String, default: 'Warehouse A' },
    lastUpdated: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Inventory || mongoose.model('Inventory', inventorySchema);
