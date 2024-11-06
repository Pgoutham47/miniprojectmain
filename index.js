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

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.get('/eamcet', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'eamcet.html'));
});

app.get('/colleges-by-rank', async (req, res) => {
    const { rank, category } = req.query;

    try {
        const query = {};
        query[category] = { $lte: parseInt(rank) };
        const colleges = await College.find(query).sort({ [category]: -1 }).limit(20);
        res.json(colleges);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

app.get('/colleges-by-branch', async (req, res) => {
    const { name, branch, category } = req.query;

    try {
        const college = await College.findOne({ 
            name, 
            branch 
        });

        if (college) {
            res.json({
                name: college.name,
                branch: college.branch,
                category: category,
                categoryValue: college[category]
            });
        } else {
            res.status(404).json({ message: 'College not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});