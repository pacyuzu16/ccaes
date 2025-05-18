const mongoose = require('mongoose');
const complaintSchema = new mongoose.Schema({
  ticketId: { type: String, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  category: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, default: 'Submitted' },
  agency: { type: String },
  response: { type: String },
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Complaint', complaintSchema);