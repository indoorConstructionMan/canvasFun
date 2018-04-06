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

//Allow access to cpus on LAN
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


// When user vists site, send static files
app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.post('/endpoint', function(req, res, next) {
    console.log('body: ' + JSON.stringify(req.body));
    // Handle request and build something to display on frontend
    var ret = {};
    req.body.message.splice(-1,1);
    for (wall in req.body.message) {
        ret[wall] = req.body.message[wall];
    }
    res.send(ret);
});

var port = 3000;

app.listen(port, () => console.log('Example app listening on port ' + port));
