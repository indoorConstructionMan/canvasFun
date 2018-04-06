// still not used.

function WallDimensions() {
    this.WallDimensions = {
        value: 0,
        p1: {x:0, y:0},
        p2: {x:0, y:0},
        height: 0
    }
}


// Set value of wall (length)
WallDimensions.prototype.setValue = function(val) {
    this.WallDimensions.value = val;
};


// Get value of wall (length)
WallDimensions.prototype.getValue = function(val) {
    return this.WallDimensions.value;
};


// set Points 1,2 respectively
WallDimensions.prototype.setPoints = function(p1, p2) {
    this.WallDimensions.p1 = p1;
    this.WallDimensions.p2 = p2;
};


// get Points 1,2 respectively
WallDimensions.prototype.getPoints = function(p1, p2) {
    return [this.WallDimensions.p1, this.WallDimensions.p2];
};


// set point1 of the wall
WallDimensions.prototype.setPoint1 = function(pt) {
    this.WallDimensions.p1 = pt;
};


// get point 1 of wall
WallDimensions.prototype.getPoint1 = function() {
    return this.WallDimensions.p1;
};


// set point 2 of wall
WallDimensions.prototype.setPoint2 = function(pt) {
    this.WallDimensions.p2 = pt;
};


// gets point 2 of wall
WallDimensions.prototype.getPoint2 = function() {
    return this.wall.p2
};


// set height of wall
WallDimensions.prototype.setHeight = function(ht) {
    this.wall.height = ht;
};


// get height of wall
WallDimensions.prototype.getHeight = function() {
    return this.wall.height;
};
