// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/sat', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a MongoDB model for search history
const SearchHistory = mongoose.model('SearchHistory', {
  searchTerm: String,
  timestamp: { type: Date, default: Date.now },
});

// Middleware to parse JSON in the request body
app.use(bodyParser.json());

// Use cors middleware
app.use(cors());

// Allow cross-origin requests for the specific route
app.options('/api/search-history', cors()); // Enable pre-flight request

// Endpoint to save search history
app.post('/api/search-history', async (req, res) => {
  try {
    const { searchTerm } = req.body;

    // Create a new search history record
    const searchRecord = new SearchHistory({ searchTerm });
    const savedRecord = await searchRecord.save();

    console.log(`Search history saved successfully with ObjectId: ${savedRecord._id}`);
    res.status(200).json({ success: true, message: 'Search history saved successfully.' });
  } catch (error) {
    console.error('Error saving search history:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
