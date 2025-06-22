import React, { useState } from 'react';
import axios from 'axios';
import './Chat.css';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await axios.post('http://localhost:5000/api/chat', {
        userId: 'user1',
        message: input,
      });

      const botReply = {
        role: 'assistant',
        content: res.data.reply,
      };

      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      console.error('Error sending message:', err);
    } finally {
      setIsTyping(false);
    }
  };

  // ✅ Move this OUTSIDE of sendMessage
  const downloadChat = () => {
    if (messages.length === 0) return alert('No messages to download.');

    const chatText = messages
      .map((msg) => `${msg.role === 'user' ? 'You' : 'Bot'}: ${msg.content}`)
      .join('\n\n');

    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = 'chat-history.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            {msg.content}
          </div>
        ))}
        {isTyping && (
          <div className="message assistant typing">
            <em>Bot is typing...</em>
          </div>
        )}
      </div>

      <div className="input-box">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>

      <div className="chat-footer">
        <button onClick={downloadChat}>Download Chat</button>
      </div>
    </div>
  );
};

export default Chat;
