const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  text: String,
  type: { type: String, enum: ['incoming', 'missed', 'outgoing'] },
  isDefault: { type: Boolean, default: false },
});

module.exports = mongoose.model('Message', messageSchema);
