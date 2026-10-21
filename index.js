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

//define a schema for the data
const itemSchema = new mongoose.Schema({
    name: String,
    description: String,
});


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});