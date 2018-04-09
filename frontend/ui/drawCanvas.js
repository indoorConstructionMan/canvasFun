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
var drawLine = (p1, p2, styling, thickness) => {
    $('#blueprint').drawLine({
        strokeStyle: styling,
        strokeWidth: thickness,
        x1: p1.x, y1: p1.y,
        x2: p2.x, y2: p2.y
    });
};


// draws dot
var drawDot = (p, styling, radius) => {
    $('#blueprint').drawArc({
        strokeStyle: styling,
        strokeWidth: LINE_WIDTH,
        x: p.x, y: p.y,
        radius: radius
    });
};


// draw wall selecting color
var drawWallWithColor = (wall, color) => {
    drawDot(wall.getPoint2(), DARK_BLACK, POINT_OUTER);
    drawLine(wall.getPoint1(), wall.getPoint2(), color, LINE_WIDTH+5);
    drawDot(wall.getPoint2(), color, POINT_INNER);
};


// draw entire path randomizing color
var drawPath = (path) => {
    var i = 0;
    for (wall in path) {
        drawWallWithColor(path[wall], colors[i]);
        drawDot(path[wall].getPoint1(), YELLOW, 8);
        drawDot(path[wall].getPoint1(), DARK_BLACK, 4);
        i += 1;
    }
};


// called in main logic, handles what to draw
var drawWall = (wall) => {
    drawWallWithColor(wall, YELLOW);
};


// called in main logic, handles what to draw
var drawPoint = (p1) => {
    drawDot(p1, YELLOW, POINT_OUTER);
    drawDot(p1, DARK_BLACK, POINT_INNER-2);
};


// clears the entire canvas
var clearScreen = () => {
    document.getElementById("blueprint").getContext("2d").clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
};


// Redraws the grid
var drawBackground = () => {

    var canvas = document.getElementById('blueprint'),
        context = canvas.getContext('2d');

    var xDelta = UNIT * (window.innerWidth/SCREEN_WIDTH);
    var yDelta = UNIT * (window.innerHeight/SCREEN_HEIGHT);

    XUNIT = xDelta;
    YUNIT = yDelta;

    SCREEN_HEIGHT = Math.round(window.innerHeight);
    SCREEN_WIDTH = Math.round(window.innerWidth);

    context.canvas.height = SCREEN_HEIGHT;
    context.canvas.width = Math.round(SCREEN_WIDTH*CANVAS_RATIO);

    clearScreen();
    var offset = document.getElementById('inputs').offsetWidth + document.getElementById('boardlist').offsetWidth
    offset += UNIT;

    // DRAW GRID LINES
    do {
         drawLine({ x: xDelta, y: YUNIT - LINE_PADDING},
                 { x: xDelta, y: Math.floor((SCREEN_HEIGHT - XUNIT - LINE_PADDING)/YUNIT)*YUNIT + YUNIT},
                 BLUEPRINTBLUE,
                 LINE_WIDTH
        );
        xDelta += XUNIT;
    } while (xDelta < SCREEN_WIDTH - offset);


    //horizontal lines
    do {
        drawLine({ x: XUNIT - LINE_PADDING, y: yDelta},
                 { x: xDelta - XUNIT + LINE_PADDING, y: yDelta},
                 BLUEPRINTBLUE,
                 LINE_WIDTH
        );
        yDelta += YUNIT;
    } while(yDelta < SCREEN_HEIGHT - LINE_PADDING);
}
