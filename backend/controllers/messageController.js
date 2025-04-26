// backend/controllers/messageController.js
const Message = require('../models/messageModel');

// Add a new message
exports.addMessage = async (req, res) => {
  const { type, message } = req.body;
  try {
    const newMessage = new Message({ type, message });
    await newMessage.save();
    res.status(201).json({ message: 'Message added successfully', newMessage });
  } catch (error) {
    res.status(500).json({ error: 'Error adding message', details: error });
  }
};

// Get all messages
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching messages', details: error });
  }
};

// Delete a message by ID
exports.deleteMessage = async (req, res) => {
  const { id } = req.params;
  try {
    const message = await Message.findByIdAndDelete(id);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting message', details: error });
  }
};
