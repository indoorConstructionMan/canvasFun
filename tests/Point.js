// not in uee
function Point() {
    this.Point = {
        x: 0,
        y: 0,
    };
}

Point.prototype.setX = (value) => {
    this.Point.x = value;
};


Point.prototype.getX = () => {
    return this.x;
};


Point.prototype.setY = (value) => {
    this.y = value;
};


Point.prototype.getY = () => {
    return this.y;
};

Point.prototype.setPoint = (p) => {
    this.Point = p;
}

var p = new Point();
console.log("New Object");
console.log(p);
p.setX(3);
console.log("After 3 added");
console.log(p);
console.log(p.Point.x);
p.setY(4);
console.log("After 3 and 4 added");
console.log(p.getX());
console.log("Should be 3");
console.log(p.getY());
console.log("END");
console.log("get point");
var p1 = new Point();
p1.setX(24);

console.log(p1.getX() + " == 24");
p1.setY(44);
console.log(p1.getY() + " == 44");
console.log(p1.setPoint({x: 24, y: 25}));
console.log(p1);


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
    return this.WallDimensions.p2
};


// set height of wall
WallDimensions.prototype.setHeight = function(ht) {
    this.WallDimensions.height = ht;
};


// get height of wall
WallDimensions.prototype.getHeight = function() {
    return this.WallDimensions.height;
};




var p2 = new Point();
p2.setX(22);
console.log(p2.getX() + " == 22");
p2.setY(464);
console.log(p2.getY() + " == 464");
console.log(p2);

var wd = new WallDimensions();
wd.setHeight(4);
console.log(wd.getHeight() + " == 4");
wd.setValue(15);
console.log(wd.getValue() + " == 15");
wd.setPoint1(p1);
console.log(wd.getPoint1() + " == (24, 44)");
wd.setPoint2(p1);
console.log(wd.getPoint2() + " == (24, 44)");

wd.setPoints(p1,p2);
console.log(wd.getPoint2() + " == (24, 44) 22 464");
console.log(wd.getPoints());
console.log(wd);
