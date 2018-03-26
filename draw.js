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
var points = [];
var stored_points = [];

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


function start() {


    document.getElementById('blueprint').addEventListener('click', function(event){

        var point = {
            x: Math.round(event.clientX/UNIT) * UNIT,
            y: Math.round(event.clientY/UNIT) * UNIT
        };

        stored_points.push(point);
        if (sectionComplete()) {
            log()
            stored_points = [];
            points = [];
        } else {
            points.push(point);
            draw(points[0], points[1]);
        }
    }, false);

    initialize();
}
