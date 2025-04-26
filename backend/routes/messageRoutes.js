const express = require('express');
const router = express.Router();
const Message = require('../models/messageModel'); // ✅ correct


// GET all messages for call type
router.get('/:type', async (req, res) => {
  const { type } = req.params;
  const messages = await Message.find({ type });
  const defaultMsg = messages.find(m => m.isDefault);
  res.json({ messages, defaultMessage: defaultMsg?.text });
});

// ADD message
router.post('/:type', async (req, res) => {
  const { type } = req.params;
  const { text } = req.body;
  const newMessage = new Message({ text, type });
  await newMessage.save();
  const messages = await Message.find({ type });
  res.json({ messages });
});

// SET default message
router.put('/:type/default', async (req, res) => {
  const { type } = req.params;
  const { id } = req.body;

  await Message.updateMany({ type }, { isDefault: false });
  await Message.findByIdAndUpdate(id, { isDefault: true });

  const messages = await Message.find({ type });
  const defaultMsg = messages.find(m => m.isDefault);
  res.json({ messages, defaultMessage: defaultMsg?.text });
});

// DELETE message
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Message.findByIdAndDelete(id);
  res.json({ success: true });
});

module.exports = router;
