const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    customer: { type: String, required: true },
    product: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: String, required: true },
    status: { type: String, default: 'Paid' },
    channel: { type: String, default: 'Website' },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Order || mongoose.model('Order', orderSchema);
