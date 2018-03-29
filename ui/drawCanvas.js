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
var drawWall = function(wall) {
    var canvas = document.getElementById('blueprint'),
        context = canvas.getContext('2d');

        drawDot(wall.getPoint2(), BLUEPRINTBLUE, POINT_OUTER);
        drawLine(wall.getPoint1(), wall.getPoint2(), BLACK, LINE_WIDTH);
        drawDot(wall.getPoint2(), BLACK, POINT_INNER);
};


// called in main logic, handles what to draw
var drawPoint = function(p1) {
    var canvas = document.getElementById('blueprint'),
        context = canvas.getContext('2d');

        drawDot(p1, BLUEPRINTBLUE, POINT_OUTER);
        drawDot(p1, BLACK, POINT_INNER);
};


// draws variables by walls
var drawText = function(xpos, ypos, message) {
    var canvas = document.getElementById('blueprint'),
        context = canvas.getContext('2d');

    context.font = "30px Arial";
    context.strokeText(message, xpos, ypos);
};


// clears the entire canvas
var clearScreen = function() {
    var c = document.getElementById("blueprint");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
};


// Redraws the grid
var drawBackground = function() {
    var canvas = document.getElementById('blueprint'),
        context = canvas.getContext('2d');

    var xDelta = UNIT * (window.innerWidth/SCREEN_WIDTH);
    var yDelta = UNIT * (window.innerHeight/SCREEN_HEIGHT);

    XUNIT = xDelta;
    YUNIT = yDelta;

    SCREEN_HEIGHT = window.innerHeight;
    SCREEN_WIDTH = window.innerWidth

    context.canvas.height = SCREEN_HEIGHT;
    context.canvas.width = SCREEN_WIDTH*CANVAS_RATIO;

    clearScreen();

    // DRAW LINES
    do {
        drawLine({ x: xDelta, y: YUNIT - LINE_PADDING},
                 { x: xDelta, y: SCREEN_HEIGHT - YUNIT + LINE_PADDING},
                 BLUEPRINTBLUE,
                 LINE_WIDTH
        );
        xDelta += XUNIT;
    } while (xDelta < SCREEN_WIDTH);

    //horizontal lines
    do {
        drawLine({ x: XUNIT - LINE_PADDING, y: yDelta},
                 { x: SCREEN_WIDTH - XUNIT + LINE_PADDING, y: yDelta},
                 BLUEPRINTBLUE,
                 LINE_WIDTH
        );
        yDelta += YUNIT;
    } while(yDelta < SCREEN_HEIGHT);
}



// Reset screen on canvas
function reset() {
    drawBackground();
    removeForm();
}
