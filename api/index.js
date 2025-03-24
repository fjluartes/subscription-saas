require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.SERVER_PORT;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Subscription Schema
const subscriptionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

// API Routes
app.get('/api/subscriptions', async (req, res) => {
  try {
    const allSubscriptions = await Subscription.find({});
    res.json(allSubscriptions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/subscriptions/:userId', async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ userId: req.params.userId });
    res.json(subscriptions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/subscriptions', async (req, res) => {
  const subscription = new Subscription({
    userId: req.body.userId,
    name: req.body.name,
    price: req.body.price,
    isActive: req.body.isActive,
  });

  try {
    const newSubscription = await subscription.save();
    res.status(201).json(newSubscription);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put('/api/subscriptions/:id', async (req, res) => {
  try {
    const subscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        price: req.body.price,
        isActive: req.body.isActive
      },
      { new: true }
    );
    res.json(subscription);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/subscriptions/:id', async (req, res) => {
  try {
    await Subscription.findByIdAndDelete(req.params.id);
    res.json({ message: 'Subscription deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello World!' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
