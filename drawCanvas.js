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
        drawDot(p2, BLUEPRINTBLUE, POINT_OUTER);
        drawLine(p1, p2, BLACK, LINE_WIDTH);
        drawDot(p2, BLACK, POINT_INNER);
        points.shift();
    } else {
        drawDot(p1, BLUEPRINTBLUE, POINT_OUTER);
        drawDot(p1, BLACK, POINT_INNER);
    }
};


// draws variables by walls
var drawText = function(xpos, ypos, message) {
    var canvas = document.getElementById('blueprint'),
        context = canvas.getContext('2d');

    context.font = "30px Arial";
    context.strokeText(message, xpos, ypos);
};


var drawSet = function() {
    console.log(stored_points);
    for (var i = 0; i < stored_points.length-1; i++) {
        drawLine(stored_points[i], stored_points[i+1], WHITE, LINE_WIDTH);
        drawDot(stored_points[i], WHITE, POINT_OUTER);
        drawDot(stored_points[i+1], WHITE, POINT_OUTER);
        drawDot(stored_points[i], BLACK, POINT_INNER);
        drawDot(stored_points[i+1], BLACK, POINT_INNER);
    }
};
