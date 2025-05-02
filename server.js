const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

dotenv.config();

const User = require('./models/user');
const opportunitiesRoutes = require('./routes/opportunitiesRoutes');
const investmentRoutes = require('./routes/investmentRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// Mount routes
app.use('/opportunities', opportunitiesRoutes);
app.use('/investments', investmentRoutes);
app.use('/dashboard', dashboardRoutes);

// Register
app.post('/register', async (req, res) => {
  const { name, email, password, phone } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, phone });
    await newUser.save();
    res.status(201).send('User Registered');
  } catch (err) {
    res.status(500).send('Error registering user');
  }
});

// Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid credentials');

    const token = jwt.sign({ id: user._id }, 'secretKey');
    res.json({ token });
  } catch (err) {
    res.status(500).send('Error logging in');
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
