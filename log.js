// Log function display route
var log = function(){
    console.log("Path Ended...");
    stored_points.forEach(function(ele){
        console.log("(x,y) => (" + Math.round(ele.x/UNIT) + ",\t" + Math.round(ele.y/UNIT) + ")");
    });
};
