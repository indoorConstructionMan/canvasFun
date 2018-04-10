/*
MIT License

Copyright (c) 2018 Aaron

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/
// setup port and ip for Server
// ipconfig -> ipv4 lan address
var PORT = 3000;
var IPADDRESS = '192.168.0.12';

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
        16: ['8','12', '12'],
        17: ['8', '9'],
        18: ['10','8'],
        19: ['10', '9'],
        20: ['8', '12'],
        21: ['9', '12'],
        22: ['12', '10'],
        24: ['8', '8', '8'],
    }[key];
}

// need to cache scrap and reuse.
function selectBoard(rows, length) {
    var x = new BoardingList();

    var availableBoard = [8, 9, 10, 12];
    var halfBoard = [4, 5, 6];
    var comboBoard = [16, 17, 18, 19, 20, 21, 22, 24];

    // add board a section at a time
    for (var j = 0; j < rows; j++) {
        var len = length;
        // all numbers beyond this while loop should be <= 24
        while (len > 24) {
            len -= 12;
            x.addOne('12');
            //console.log('added 12 f1');
        }

        if (len <= 4) {
            if (rows == 2){
                x.addOne('8');
                len -= 8;
                return x;
            } else if (rows == 3) {
                x.addOne('12');
                len -= 12;
                return x;
            } else {
                x.addOne('8');
                return x;
            }
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

app.listen(PORT, process.env.OPENSHIFT_NODEJS_IP || process.env.IP || IPADDRESS);
