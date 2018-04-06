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

function Wall() {
    this.wall = {
        value: 0,
        p1: {x:0, y:0},
        p2: {x:0, y:0},
        height: 0
    }
}


// Set value of wall (length)
Wall.prototype.setValue = function(val) {
    this.wall.value = val;
};


// Get value of wall (length)
Wall.prototype.getValue = function(val) {
    return this.wall.value;
};


// set Points 1,2 respectively
Wall.prototype.setPoints = function(p1, p2) {
    this.wall.p1 = p1;
    this.wall.p2 = p2;
};


// get Points 1,2 respectively
Wall.prototype.getPoints = function(p1, p2) {
    return [this.wall.p1, this.wall.p2];
};


// set point1 of the wall
Wall.prototype.setPoint1 = function(pt) {
    this.wall.p1 = pt;
};


// get point 1 of wall
Wall.prototype.getPoint1 = function() {
    return this.wall.p1;
};


// set point 2 of wall
Wall.prototype.setPoint2 = function(pt) {
    this.wall.p2 = pt;
};


// gets point 2 of wall
Wall.prototype.getPoint2 = function() {
    return this.wall.p2
};


// set height of wall
Wall.prototype.setHeight = function(ht) {
    this.wall.height = ht;
};


// get height of wall
Wall.prototype.getHeight = function() {
    return this.wall.height;
};

// set points(p1, p2)
// get points(p1, p2)

//
//-------------------------------------------
// init
Wall.prototype.init = function(point) {
    this.setPoint1(point);
    drawPoint(this.getPoint1());
    this.attachList(new BoardingList());
};


// update
Wall.prototype.update = function(point) {
    this.setPoint1(point);
    this.attachList(new BoardingList());
};


// sets and draws point
Wall.prototype.setAndDraw = function(point) {
    this.setPoint2(point);
    drawWall(this);
    drawPoint(this.getPoint1());
};




// get wall
Wall.prototype.getWall = function() {
    return this.wall;
};


// set point1 zero point2
Wall.prototype.swapAndZeroPoint = function() {
    this.wall.p1 = this.wall.p2;
    this.wall.p2 = {x:0, y:0};
};


// set loaded
Wall.prototype.setLoaded = function(state) {
    this.wall.loaded = state;
};


// get loaded
Wall.prototype.getLoaded = function() {
    return this.wall.loaded;
}


// attach a boardinglist to current wall
Wall.prototype.attachList = function(material) {
    this.boardlist = material;
};


// attach a boardinglist to current wall
Wall.prototype.listExist = function(material) {
    return this.boardlist != null;
};


Wall.prototype.getSqft = function() {
        return this.getList().getSqft();
};
