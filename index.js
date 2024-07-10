const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Data = require('./models/Data');  // Import the Data model

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Use cors

// Serve static files from the 'assets' and 'videos' folders
app.use('/assets', express.static('assets'));
app.use('/videos', express.static('videos'));

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/Location", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

// Route to handle /getdata requests
app.post('/getdata', async (req, res) => {
  const { inputData } = req.body;
  try {
    const regex = new RegExp(inputData, 'i'); // 'i' for case-insensitive
    const data = await Data.find({ name: { $regex: regex } });
    
    if (data.length > 0) {
      res.status(200).json({ success: true, data: data });
    } else {
      res.status(404).json({ message: 'Cannot find data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
