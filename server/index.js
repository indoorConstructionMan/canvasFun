const express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
const app = express();
const BoardingList = require('./BoardingList.js');

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


function lookUpTable(key) {
    return {
        16: ['8','8'],
        17: ['8', '9'],
        18: ['10','8'],
        19: ['10', '9'],
        20: ['8', '12'],
        21: ['9','12'],
        22: ['12','10'],
        24: ['8','8','8'],
    }[key];
}


function selectBoard(rows, length) {
    var x = new BoardingList();

    availableBoard = [8, 9, 10, 12];
    halfBoard = [4, 5, 6];
    comboBoard = [16, 17, 18, 19, 20, 21, 22, 24];

    // add board a section at a time
    for (var j = 0; j < rows; j++) {
        var len = length;
        // all numbers beyond this while loop should be <= 24
        while (len > 24) {
            len -= 12;
            x.addOne('12');
            //console.log('added 12 f1');
        }

        // all numbers after this for loop should be 1-24 excluding 8, 9, 10, 12
        for (var i = 0; i < availableBoard.length; i++) {
            if (availableBoard[i] == len) {
                x.addOne(len.toString());
                len -= availableBoard[i];
                //console.log('added availableBoard');
                //console.log(len);
            }
        }

        // all numbers after for include 1-24 not including numbers on availableBoard and halfBoard
        for (var i = 0; i < comboBoard.length; i++) {
            if (comboBoard[i] == len) {
                var list = lookUpTable(comboBoard[i]);
                //console.log('adding comboBoard');
                for (ele in list) {
                    x.addOne(list[ele]);
                    len -= parseInt(list[ele]);
                }
            }
        }

        if (len <= 4 && rows > 1 && len > 0) {
            x.addOne('8');
            len -= 8;
            //console.log('adding for < 4');
        }

        // check for half cuts
        for (var i = 0; i < halfBoard.length; i++) {
            if (halfBoard[i] == len && rows > 1) {
                x.addOne((halfBoard[i]*2).toString());
                len -= halfBoard[i]*2;
                return x;
                //console.log('adding half cuts');
            }

        }

        // possibilities left are [13, 14, 15, 23]
        if (len <= 12 && len >= 4) {
            //console.log('>12 <4');
            if (len <= 8) {
                x.addOne('8');
                len -= 8;
            } else if (len <= 9) {
                x.addOne('9');
                len -= 9;
            } else if (len <= 10) {
                x.addOne('10');
                len -= 10;
            } else {
                x.addOne('12');
                len -= 12;
            }
        }

        while (len > 0) {
            //console.log('len still positive');
            x.addOne('8');
            len -= 8;
        }
    }
    return x;
}

app.post('/calculate', function(req, res, next) {
    console.log('body: ' + JSON.stringify(req.body));
    // Handle request and build something to display on frontend
    // remove dead wall.
    var ret = {};
    req.body.message.splice(-1,1);
    for (wall in req.body.message) {
        ret[wall] = req.body.message[wall];
    }

    for (wall in ret) {
        // Can I break wall into sections
        if (ret[wall]['wall']['height'] % 4 == 0) {
            var rows = parseInt(ret[wall]['wall']['height']/4);
            var length = ret[wall]['wall']['value'];
            ret[wall]['wall']['boardList'] = selectBoard(rows, length);
        }
    }
    res.send(ret);
});


var port = 3000;
app.listen(port, () => console.log('Example app listening on port ' + port));
