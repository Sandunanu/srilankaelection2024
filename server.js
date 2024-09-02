const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());
app.use(express.static('public'));

const votesFile = 'votes.json';

let votes = {
    'Ranil Wickremesinghe': 0,
    'Namal Rajapaksa': 0,
    'Sajith Premadasa': 0,
    'Anura Kumara Dissanayake': 0
};

// Load votes from file if it exists
if (fs.existsSync(votesFile)) {
    votes = JSON.parse(fs.readFileSync(votesFile));
}

app.get('/votes', (req, res) => {
    res.json(votes);
});

app.post('/vote', (req, res) => {
    const { candidate } = req.body;
    if (votes[candidate] !== undefined) {
        votes[candidate]++;
        fs.writeFileSync(votesFile, JSON.stringify(votes));
        res.json({ success: true, votes });
    } else {
        res.status(400).json({ success: false, message: 'Invalid candidate' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
