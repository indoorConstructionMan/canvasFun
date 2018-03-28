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
        firstPoint: false,
        value: 0,
        loaded: false,
        p1: {x:0, y:0},
        p2: {x:0, y:0},
        boardlist: null,
        height: 0
    }
}


// get wall
Wall.prototype.getWall = function() {
    return this.wall;
};


// set point1 zero point2
Wall.prototype.swapAndZeroPoint = function() {
    this.wall.p1 = this.wall.p2;
    this.wall.p2 = {x:0, y:0};
};


// set flag for something idk anymore
Wall.prototype.setFlag = function(state) {
    this.wall.firstPoint = state;
};


// get flag for something idk anymore
Wall.prototype.getFlag = function() {
    return this.wall.firstPoint;
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


// set points the user is drwaing out.
Wall.prototype.setPoint1 = function(pt) {
    this.setFlag(true);
    this.wall.p1 = pt;
};


// set points the user is drwaing out.
Wall.prototype.setPoint2 = function(pt) {
    this.setFlag(false);
    this.wall.p2 = pt;
};


// set points the user is drwaing out.
Wall.prototype.getPoint2 = function() {
    return this.wall.p2
};


// set points the user is drwaing out.
Wall.prototype.getPoint1 = function() {
    return this.wall.p1;
};


// set points the user is drwaing out.
Wall.prototype.getList = function() {
    return this.boardlist;
};


Wall.prototype.setValue = function(val) {
    this.wall.value = val;
};


Wall.prototype.getValue = function(val) {
    return this.wall.value;
};


Wall.prototype.getSqft = function() {
        return this.getList().getSqft();
};
