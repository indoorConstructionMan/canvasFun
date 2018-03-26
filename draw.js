var points = [];


window.onload = function() {
    console.log('test');
    draw();
}


function draw() {
    var canvas = document.getElementById('blueprint'),
        context = canvas.getContext('2d');
    var count = 0;
    var unit = 50;

    var xDelta = unit;
    var yDelta = unit;

    canvas.addEventListener('click', function(event){
        var point = {
            x: Math.round(event.clientX/unit) * unit,
            y: Math.round(event.clientY/unit) * unit
        };

        points.push(point);
        console.log(points);
        if (points.length == 2){
            context.beginPath();
            context.lineWidth="5";
            context.strokeStyle="#000000";
            context.moveTo(points[0].x, points[0].y);
            context.lineTo(points[1].x, points[1].y);
            context.stroke();
            context.rect(points[1].x, points[1].y, 5, 5);
            context.fill();
            points.shift();
        } else {
            context.rect(points[0].x, points[0].y, 5, 5);
            context.fill();
        }
    }, false);

    //vertical lines
    do {
        context.beginPath();
        context.lineWidth="5";
        context.strokeStyle="#d3d3d3";
        context.moveTo(xDelta, unit);
        context.lineTo(xDelta, 1100-unit);
        context.stroke();
        xDelta += unit;
        count += 1;
    } while (xDelta < 1900);

    var verticalLines = count;
    count = 0;
    //horizontal lines
    do {
        context.beginPath();
        context.lineWidth="5";
        context.strokeStyle="#d3d3d3";
        context.moveTo(unit, yDelta);
        context.lineTo(1900-unit, yDelta);
        context.stroke();
        yDelta += unit;
    } while(yDelta < 1080);
        count += 1;
}
