const express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

// add route for frontend files.
app.use(express.static(path.join(__dirname, '../frontend')));

// When user vists site, send static files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.post('/endpoint', function(req, res) {
    console.log('body: ' + JSON.stringify(req.body));
    // Handle request and build something to display on frontend
    res.send("this is a string");
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
