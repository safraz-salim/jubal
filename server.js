const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/profile', require('./routes/profileRoutes'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/enrollments', require('./routes/enrollments'));


const Contact = require('./models/Contact');

// Route to handle contact form
app.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    await Contact.create({ name, email, phone, message });
    res.send('Message received. Thank you!');
  } catch (error) {
    res.status(500).send('Error saving message');
  }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server started on port ${PORT}`));
