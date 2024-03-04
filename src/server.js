// Server-side code (Node.js with Express)
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

mongoose.connect('mongodb+srv://ArjunPrithvi:Arjunprithvi3@cluster0.nrky1hz.mongodb.net/sample?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1); // Exit the application if connection fails
});

app.use(cors());
app.use(bodyParser.json());

const Schema = mongoose.Schema;
const dataSchema = new Schema({
  _id: Number, // assuming id is an integer
  name: String,
  age: Number,
});
const DataModel = mongoose.model('Data', dataSchema);

app.post('/api/data', async (req, res) => {
  try {
    const { id, name, age } = req.body;
    const newData = new DataModel({ _id: id, name, age });
    await newData.save();
    res.status(201).send('Data inserted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

app.delete('/api/data/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deletedData = await DataModel.findByIdAndDelete(id);
    if (!deletedData) {
      return res.status(404).send('Data not found');
    }
    res.status(200).send('Data deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

app.get('/api/data', async (req, res) => {
  try {
    const allData = await DataModel.find();
    res.status(200).json(allData); // Return data as JSON
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
