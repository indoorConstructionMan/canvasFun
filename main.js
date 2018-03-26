require('./constants.js');
require('./drawCanvas.js');

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


// Log function display route
var log = function(){
    console.log("Path Ended...");
    stored_points.forEach(function(ele){
        console.log("(x,y) => (" + ele.x + ",\t" + ele.y + ")");
    });
};


// Did we double click? if we did then section is complete
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


// create elements for user to input values
var createInputFields = function(count) {
    // add header/title for form
    var title = document.createElement('H');
    var text = document.createTextNode("Please Input Measurements");
    title.appendChild(text);
    document.getElementById('inputs').appendChild(title);

    //create height input
    document.getElementById('inputs').appendChild(document.createElement('br'));
    var h = document.createElement("INPUT");
    h.setAttribute("type", "text");
    h.setAttribute("placeholder", "Height");
    document.getElementById('inputs').appendChild(h);

    // for each line/wall accept a single value
    for (var i = 0; i < count; i++) {
        var x = document.createElement("INPUT");
        x.setAttribute("type", "text");
        x.setAttribute("placeholder", symbol[i]);
        document.getElementById('inputs').appendChild(x);
    }


    var formButton = document.createElement('BUTTON');
    formButton.innerHTML = "Calculate materials";
    formButton.setAttribute('id', 'formButton');
    formButton.setAttribute('type', 'button');
    formButton.setAttribute('class', 'w3-button w3-blue');
    formButton.setAttribute('onclick', 'submitForm()');
    document.getElementById('inputs').appendChild(formButton);
    document.getElementById('inputs').appendChild(document.createElement('br'));

};


function submitForm() {
    // 4*8 4*9 4*10 4*12 4*14 4.5*12
    var boards = [0, 0, 0, 0, 0, 0];
    var multiplier = 1;


    var pointSet = document.querySelectorAll('INPUT');
    var wallHeight = pointSet[0].value;
    if (wallHeight == 8) {
        multiplier = 2;
    }
    for (var i = 1; i < pointSet.length; i++) {
        var wallLength = pointSet[i].value;
        while(wallLength > 0) {
            if (wallLength <= 8) {
                boards[0] += multiplier;
                wallLength -= 8;
                console.log(boards[0]);
                console.log(i);
            } else if (wallLength <= 9) {
                boards[1] += multiplier;
                wallLength -= 9;
            } else if (wallLength <= 10) {
                boards[2] += multiplier;
                wallLength -= 10;
            } else if (wallLength <= 12) {
                boards[3] += multiplier;
                wallLength -= 12;
            } else if (wallLength <= 14) {
                boards[4] += multiplier;
                wallLength -= 14;
            } else {
                while(wallLength > 0){
                    wallLength -= 12;
                    boards[3] += multiplier;
                }
            }
        }
    }

    createList(boards);

}


function createList(arr) {
    var boardNames = ["4'x 8'", "4' x 9'", "4' x 10'", "4' x 12'", "4' x 14'" , "4.5' x 12'"];
    for (var i = 0; i < arr.length; i++) {
            if(arr[i] != 0) {
                var n = document.createElement('LI');
                n.innerHTML = boardNames[i] + " => " + arr[i] + " boards.";
                document.getElementById('inputs').appendChild(n);
            }
    }

}


// setup all variables to calculate board
var setupVariables = () => {
    const closedPath = false;
    stored_points.splice(-1, 1);
    if (stored_points[0] == stored_points[stored_points.length-1]) {
        console.log("Closed path");
        closedPath = true;
    }

    var diffX = 0;
    var diffY = 0;

    var xNew = 0;
    var yNew = 0;

    count = 0;

    for (var i = 0; i < stored_points.length-1; i++){
        // get direction of wall, place text in reasonable place, add a list at
        // bottom to allow for user input.
        diffX = stored_points[i].x - stored_points[i+1].x;
        diffY = stored_points[i].y - stored_points[i+1].y;

        if (!diffY) {
            xNew = stored_points[i].x - Math.round(diffX/2);
            yNew = stored_points[i].y + 35;
        } else if (!diffX) {
            yNew = stored_points[i].y - Math.round(diffY/2);
            xNew = stored_points[i].x + 20;
        } else {
            xNew = stored_points[i].x - Math.round(diffX/2) + PADDING;
            yNew = stored_points[i].y - Math.round(diffY/2) - PADDING;
        }

        drawText(xNew, yNew, symbol[i]);
        count += 1;
    }

    createInputFields(count);


    if (closedPath) {
        console.log("Confirmed closed");
    }
};


// initialize the grid in the background.
var initialize = function() {

    var canvas = document.getElementById('blueprint'),
        context = canvas.getContext('2d');
    var xDelta = UNIT;
    var yDelta = UNIT;

    // DRAW LINES
    do {
        drawLine({ x: xDelta, y: UNIT},
                 { x: xDelta, y: SCREEN_HEIGHT - UNIT},
                 "#d3d3d3",
                 LINE_WIDTH
        );
        xDelta += UNIT;
    } while (xDelta < SCREEN_WIDTH);

    //horizontal lines
    do {
        drawLine({ x: UNIT, y: yDelta},
                 { x: SCREEN_WIDTH - UNIT, y: yDelta},
                 "#d3d3d3",
                 LINE_WIDTH
        );
        yDelta += UNIT;
    } while(yDelta < SCREEN_HEIGHT);
};


// main entry point of the program
function start() {
    document.getElementById('blueprint').addEventListener('click', function(event){

        var point = {
            x: Math.round(event.clientX/UNIT) * UNIT,
            y: Math.round(event.clientY/UNIT) * UNIT
        };

        stored_points.push(point);
        if (sectionComplete()) {
            log();
            setupVariables();
            stored_points = [];
            points = [];
        } else {
            points.push(point);
            draw(points[0], points[1]);
        }
    }, false);

    initialize();
}
