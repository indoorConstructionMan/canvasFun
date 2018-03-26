// run this when dom has loaded.
window.onload = function() {
    console.log('Welcome to drywall calculator');
    start();
}


// Good ol' globals
const UNIT = 50;
const POINT_OUTER = 8;
const POINT_INNER = 4;
const LINE_WIDTH = 5;
const SCREEN_WIDTH = 1900;
const SCREEN_HEIGHT = 1100;
const PADDING = 10;

var points = [];
var stored_points = [];
var walls = [];

var symbol = [
    'x',
    'y',
    'z',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l'
];


// Log function display route
var log = function(){
    console.log("Path Ended...");
    stored_points.forEach(function(ele){
        console.log("(x,y) => (" + ele.x + ",\t" + ele.y + ")");
    });
};


// draws single line
var drawLine = function(p1, p2, styling, thickness) {
    var canvas = document.getElementById('blueprint'),
        context = canvas.getContext('2d');

    context.beginPath();
    context.lineWidth=thickness;
    context.strokeStyle=styling;
    context.moveTo(p1.x, p1.y);
    context.lineTo(p2.x, p2.y);
    context.stroke();
};


// draws dot
var drawDot = function(p, styling, radius) {
    var canvas = document.getElementById('blueprint'),
        context = canvas.getContext('2d');

    context.beginPath();
    context.strokeStyle=styling;
    context.arc(p.x, p.y, radius, 0, 2 * Math.PI);
    context.fill();
    context.stroke();
};


// called in main logic, handles what to draw
var draw = function(p1, p2) {
    var canvas = document.getElementById('blueprint'),
        context = canvas.getContext('2d');
    if (points.length == 2){
        drawDot(p2, "#d3d3d3", POINT_OUTER);
        drawLine(p1, p2, "#000000", LINE_WIDTH);
        drawDot(p2, "#000000", POINT_INNER);
        points.shift();
    } else {
        drawDot(p1, "#d3d3d3", POINT_OUTER);
        drawDot(p1, "#000000", POINT_INNER);
    }
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


// draws variables by walls
var drawText = function(xpos, ypos, message) {
    var canvas = document.getElementById('blueprint'),
        context = canvas.getContext('2d');

    context.font = "30px Arial";
    context.strokeText(message, xpos, ypos);
};


// create elements for user to input values
var createInputFields = function(count) {
    var h = document.createElement("INPUT");
    h.setAttribute("type", "text");
    h.setAttribute("value", "Height");
    document.body.appendChild(h);

    for (var i = 0; i < count; i++) {
        var x = document.createElement("INPUT");
        x.setAttribute("type", "text");
        x.setAttribute("value", symbol[i]);
        document.body.appendChild(x);
    }
};


var submitButton = function() {
    var h = document.createElement("BUTTON");
    h.setAttribute("type", "button");
    h.setAttribute("value", "Generate Board");
    h.setAttribute("id", "genButton");
    document.body.appendChild(h);
};



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
    } while(yDelta < 1080);
};


// main entry point of the program
function start() {
    var canvas = document.getElementById('blueprint');

    canvas.addEventListener('click', function(event){

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
