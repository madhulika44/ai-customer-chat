const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes);


// ✅ Middlewares first
app.use(cors());
app.use(express.json());

// ✅ Then import and use routes
const chatRoutes = require('./routes/chatRoutes');
app.use('/api/chat', chatRoutes);

// ✅ Optional test route
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server listening at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
