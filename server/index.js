const express = require('express');
var path = require('path');
const app = express();

// add route for frontend files.
app.use(express.static(path.join(__dirname, '../frontend')));

// When user vists site, send static files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
