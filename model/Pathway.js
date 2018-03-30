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

function Pathway() {
    this.path = {
        walls: [],
        closed: false
    }
}


// adds wall and builds platform if ready
Pathway.prototype.addWallAndBuildPathForm = function(wall) {
    this.addWall(wall);
    return this.checkAndBuildPathForm();
};


// set closed condition
Pathway.prototype.checkAndBuildPathForm = function() {
    if (this.checkComplete()) {
        this.buildPathForm();
        return true;
    }
    return false;
};


// check if path is fully drawn
Pathway.prototype.checkComplete = function() {
    var current = this.path.walls[this.path.walls.length-1];
    if (current.getPoint1().x == current.getPoint2().x && current.getPoint1().y == current.getPoint2().y) {
        return true;
    }
    return false;
};


// set closed condition
Pathway.prototype.setClosed = function(state) {
    this.path.closed = state;
};


// get closed condition
Pathway.prototype.getClosed = function() {
    return this.path.closed;
};


// adds wall to the list.
Pathway.prototype.addWall = function(currentWall) {
    this.path.walls.push(currentWall);
};


// set points the user is drwaing out.
Pathway.prototype.getWalls = function() {
    return this.path.walls;
};


// sum all walls and get sqft
Pathway.prototype.getFullSqft = function() {
        var sum = 0;
        for (wall in this.getWalls()) {
            sum += this.path.walls[wall].getList().getSqft();
        }
        return sum;
};


// Draw a set of points
Pathway.prototype.drawSetOfLines = function() {
    var wallsInPath = this.getWalls();
    for (wall in wallsInPath) {
        p1 = wallsInPath[wall].getPoint1();
        p2 = wallsInPath[wall].getPoint2();
        drawLine(p1, p2, WHITE, LINE_WIDTH);
        drawDot(p1, WHITE, POINT_OUTER);
        drawDot(p2, WHITE, POINT_OUTER);
        drawDot(p1, BLACK, POINT_INNER);
        drawDot(p2, BLACK, POINT_INNER);
    }
};


// create elements for user to input values
Pathway.prototype.createInputFields = function(count) {
    createFormTitle();
    createHeightInput();
    for (var i = 0; i < count; i++) {
        var x = document.createElement("INPUT");
        x.setAttribute("type", "text");
        x.setAttribute("placeholder", symbol[i]);
        document.getElementById('inputs').appendChild(x);
    }
    createFormButton();
};


// need to clean this up...
Pathway.prototype.buildPathForm = function() {

    this.drawSetOfLines();
    var wallsInPath = this.getWalls();
    var len = wallsInPath.length;
    var diffX = 0;
    var diffY = 0;
    for (var i = 0; i < len-1; i++) {
        var xNew = 0,
            yNew = 0,
            point1 = wallsInPath[i].getPoint1(),
            point2 = wallsInPath[i].getPoint2();

        diffX = point1.x - point2.x;
        diffY = point1.y - point2.y;

        if (!diffY) {
            xNew = point1.x - Math.round(diffX/2);
            yNew = point1.y + 35;
        } else if (!diffX) {
            yNew = point1.y - Math.round(diffY/2);
            xNew = point1.x + 20;
        } else {
            xNew = point1.x - Math.round(diffX/2) + PADDING;
            yNew = point1.y - Math.round(diffY/2) - PADDING;
        }

        drawText(xNew, yNew, symbol[i]);
    }
    this.createInputFields(len-1);
};
