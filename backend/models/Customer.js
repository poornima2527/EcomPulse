const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, default: '' },
    city: { type: String, default: '' },
    totalOrders: { type: Number, default: 0 },
    totalSpending: { type: Number, default: 0 },
    lastOrder: { type: String, default: '' },
    status: { type: String, default: 'Active' },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Customer || mongoose.model('Customer', customerSchema);
