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
SOFTWARE.*/

// BUG: letters need position adjustment on angled lines.
// BUG: scaling is an issue.

require('./constants.js');
require('./drawCanvas.js');
require('./log.js');
require('./userInput.js');


// import functions from other local files.
function require(path) {
    var imported = document.createElement('script');
    imported.src = path;
    document.head.appendChild(imported);
}


// run this when dom has loaded.
window.onload = function() {
    console.log('Welcome to drywall calculator');
    start();
}


// Reset screen on canvas
function reset() {
    drawBackground();
    removeForm();
    points = [];
    stored_points = [];
}


// find board count for 54 inch (9 foot walls)
// function populate54s(v) {
//     while (v > 0) {
//         v -= 12;
//         boardList.twelves54 += 2;
//     }
//     boardList.waste.push(Math.round(Math.abs(v)));
// }


// gets all other board required.
function populateBoard(wall) {
    var val = 0;
    rows = Math.floor(wall.height / 4);
    remainder = wall.height % 4;
    for (var i = 0; i < rows; i++) {
        val = wall.value;
        while(val > 0) {
            if (val <= 8) {
                boardList.eights += 1;
                val -= 8;
            } else if (val <= 9) {
                boardList.nines += 1;
                val -= 9;
            } else if (val <= 10) {
                boardList.tens += 1;
                val -= 10;
            }  else {
                val -= 12;
                boardList.twelves += 1;
            }
        }
    }
}


// Issue with value?
function submitForm() {
    var inputWalls = document.querySelectorAll('INPUT');

    for (var i = 0; i < walls.length; i++) {

            if (walls[i]['loaded']) {
                walls[i]['loaded'] = false;
            } else {
                walls[i]['loaded'] = true;
                walls[i]['value'] = inputWalls[i+1].value;
                walls[i]['height'] = inputWalls[0].value;
                walls[i]['bdft'] = walls[i]['height'] * walls[i]['value'];
                populateBoard(walls[i]);
            }
    }

    console.log(boardList);

    createList();
}


function createList() {
    var boardNames = ["4' x 8'", "4' x 8' Aqua", "4' x 9'", "4' x 10'", "4' x 10' Aqua", "4' x 12'", "4' x 12 CD'" , "54 x 12'"];
    var i = 0;
    for (board in boardList) {
        if (board.isArray) {
            continue;
        }  else if (boardList[board] != 0) {
            var n = document.createElement('LI');
            n.innerHTML = boardNames[i] + " := " + boardList[board] + " board(s).";
            document.getElementById('inputs').appendChild(n);
        } else {}
        i += 1;
    }

}


// Did we double click or click on same position twice? if we did then section is complete
var sectionComplete = function() {
    if (stored_points.length >= 2) {
        if (stored_points[stored_points.length-2].x == stored_points[stored_points.length-1].x) {
            if (stored_points[stored_points.length-2].y == stored_points[stored_points.length-1].y) {
                return true;
            }
        }
    }
    return false;
};


// stores x,y locations of two points between a wall.
function storeCoordinates() {
    var w = getWall();
    for (var i = 0; i < stored_points.length-1; i++) {
        w.point1.x = stored_points[i].x;
        w.point1.y = stored_points[i].y;
        w.point2.x = stored_points[i+1].x;
        w.point2.y = stored_points[i+1].y;
        walls.push(w);
    }
}


// main entry point of the program
function start() {
    // Grab canvas tag add a listen
    document.getElementById('blueprint').addEventListener('click', function(event){

        var point = {
            x: Math.round(event.clientX/UNIT) * UNIT,
            y: Math.round(event.clientY/UNIT) * UNIT
        };

        stored_points.push(point);
        if (sectionComplete()) {
            //log();
            buildForm();
            storeCoordinates();
            stored_points = [];
            points = [];
        } else {
            points.push(point);
            draw(points[0], points[1]);
        }
    }, false);

    drawBackground();
}
