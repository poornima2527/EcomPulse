const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    cost: { type: Number, required: true },
    stock: { type: Number, required: true },
    status: { type: String, default: 'Active' },
    sales: { type: Number, default: 0 },
    description: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);
