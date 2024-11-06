const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const College = require('./college.js');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use(express.static('frontend'));

mongoose.connect('mongodb://localhost:27017/college-rankings', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.error("MongoDB connection error:", err);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/frontend/project1.html'); // Adjust the path as needed
  });

// Serve step2.html for the step2 route
app.get('/step2.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'step2.html')); // Use path module for better path handling
});

// Fetch colleges based on rank, course level, stream, and category
app.get('/colleges-by-rank', async (req, res) => {
    const { rank, category } = req.query;

    try {
        const query = {};
        if (rank) query[category] = { $gte: rank }; // Ensure rank in DB is <= given rank
        const colleges = await College.find(query);
        res.json(colleges);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Fetch colleges based on branch, course level, stream, and category
app.get('/colleges-by-branch', async (req, res) => {
    const { name, branch, category } = req.query;

    try {
        const college = await College.findOne({ 
            name, 
            branch 
        }, { [category]: 1, _id: 0 }); // Fetch only the specified category field

        if (college) {
            res.json({ categoryValue: college[category] });
        } else {
            res.status(404).json({ message: 'College not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
