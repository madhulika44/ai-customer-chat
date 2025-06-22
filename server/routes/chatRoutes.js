const express = require('express');
const router = express.Router();
const Conversation = require('../models/Conversation');
const axios = require('axios');
const Faq = require('../models/Faq');

// POST /api/chat - receive user message and save it
router.post('/', async (req, res) => {
  try {
    const { userId, message } = req.body;
    console.log('Received POST /api/chat');
    console.log('userId:', userId);
    console.log('message:', message);

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const newMessage = { role: 'user', content: message };

    // Save message to conversation
    let conversation = await Conversation.findOne({ userId });

    if (!conversation) {
      conversation = new Conversation({
        userId,
        messages: [newMessage],
      });
    } else {
      conversation.messages.push(newMessage);
    }

    await conversation.save();

    // ✅ Fetch FAQ content and build system prompt
    const faqData = await Faq.findOne();
    const systemPrompt = faqData
  ? `You are a helpful AI support agent. Use the FAQ below **only if relevant** to the user's question. If the user's input is just a greeting (like "hi", "hello"), greet them politely and ask how you can help — do NOT list the whole FAQ.\n\n${faqData.content}`
  : 'You are a helpful customer support assistant. Answer user queries clearly.';

    // ✅ AI API call
    const response = await axios.post(
      'https://api.together.xyz/v1/chat/completions',
      {
        model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
        },
      }
    );

    // ✅ Save bot reply
    const botReply = {
      role: 'assistant',
      content: response.data.choices[0].message.content,
    };

    conversation.messages.push(botReply);
    await conversation.save();

    res.json({ reply: botReply.content });

  } catch (err) {
    console.error("❌ Error in POST /api/chat:", err?.response?.data || err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
