const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(
  'mongodb+srv://souravdummy:L7Dijh62E%40YL2rc@cluster0.cs8z1es.mongodb.net/expresscrud'
)
.then(() => {
  console.log('MongoDB Connected');
})
.catch((err) => {
  console.error('MongoDB Connection Error:', err);
});

// Root Route
app.get('/', (req, res) => {
  res.send('Server is running successfully');
});

// Schema
const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
});

const Item = mongoose.model('Item', itemSchema);

// Create Item
app.post('/items', async (req, res) => {
  try {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read All Items
app.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Item
app.delete('/items/:id', async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({
        error: 'Item not found'
      });
    }

    res.json({
      message: 'Item deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

//Update Item
app.put('/items/:id', async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate( req.params.id, req.body, { new: true });

    if (!updatedItem) {

      return res.status(404).json({
        error: 'Item not found'
      });
    }                                                                                 
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});