const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  role: {
    type: String, // 'user' or 'assistant'
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const conversationSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    messages: [messageSchema],
  },
  { timestamps: true }
);

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;
