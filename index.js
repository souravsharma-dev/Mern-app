const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://souravdummy:L7Dijh62E%40YL2rc@cluster0.cs8z1es.mongodb.net/expresscrud')

mongoose.connect(
  'mongodb+srv://souravdummy:L7Dijh62E%40YL2rc@cluster0.cs8z1es.mongodb.net/expresscrud'
)
.then(() => {
  console.log('MongoDB Connected');
})
.catch((err) => {
  console.error('MongoDB Connection Error:', err);
});

//define a schema for the data sofe osdads
const itemSchema = new mongoose.Schema({
    name: String,
    description: String,
});

const Item = mongoose.model('Item', itemSchema);

//create a new item 
app.post('/items', async (req, res) => {
  try{
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//read all items
app.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});