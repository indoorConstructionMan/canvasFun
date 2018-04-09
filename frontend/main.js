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

// BUG: Points, walls, and paths are sometimes not redrawn on resize?!?!
// BUG: If screen size changes, it will still draw to those specific coordinates,
// BUG: dynamic stuff added to form just goes past the form container.
// BUG: When i add new wall to same project, the materials list doesn't disappear
// BUG: sometimes redraws the incorrect color when resizing
// BUG: chunks don't work
// BUG: board doesn't calculate correctly
// BUG: Consider paper.js framework for rendering graphics to the to the canvas

require('./misc/constants.js');
require('./ui/drawCanvas.js');
require('./misc/log.js');
require('./ui/materialsForm.js');
require('./model/Wall.js');
require('./model/Pathway.js');
require('./ui/materialsList.js');


// import functions from other local files.
function require(locationInProject) {
    var imported = document.createElement('script');
    imported.src = locationInProject;
    document.head.appendChild(imported);
}



// run this when dom has loaded.
window.onload = function() {
    console.log('Welcome to drywall calculator');
    addApplicationTitle();
    drawBackground();
    start();
}


$(document).ready(function() {
        $(window).resize(function() {
            drawBackground();
            // wall can't be accessed inside switch case?!?!
            var temp = 0;

            if(click) {
                var temp = wall.getPoints()[0];
            }

            for (p in pathways) {
                drawPath(pathways[p].getWalls());
            }

            for (w in wallHolder) {
                if (w == wallHolder.length - 1) {
                    wallHolder[w].setPoint2(wallHolder[0].getPoint1());
                    wallHolder[w].setPoint1(pathStart);
                    drawWall(wallHolder[w]);
                    drawPoint(wallHolder[0].getPoint1());
                    drawPoint(pathStart);
                } else {
                    drawWall(wallHolder[w]);
                }
            }

            switch(click){
                case 1:
                    drawPoint(wall.getPoint1());
                    break;
                case 2:
                    if (pathways.length) {
                        var x = new Wall();
                        x.setPoint1(point1);
                        x.setPoint2(temp);
                        wall = x;
                    } else {
                        wall.setPoint2(wall.getPoint1());
                        wall.setPoint1(point1);
                    }

                    drawWall(wall);
                    drawPoint(point1);
                    wall.update(wall.getPoint2());
                    break;
                default:
                    break;
            }
        }
    );
});


// onclick for clear button it resets screen on canvas
function reset() {
    removeForm();
    addApplicationTitle();
    drawBackground();
    if (click == 2){
        path = new Pathway();
        wall = new Wall();
        pathway = path;
    }
    click = 0;

}


// onclick handler for materials submit Form
function submitForm() {
    var setWalls = pathway.getWalls();
    var inputWalls = document.querySelectorAll('INPUT');

    var actualSqft = 0;
    for (var i = 0; i < setWalls.length-1; i++) {
        setWalls[i].setHeight(inputWalls[0].value);
        setWalls[i].setValue(inputWalls[i+1].value);
        actualSqft += inputWalls[0].value * inputWalls[i+1].value;
    }

    var data = {};
    data.message = setWalls;

    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: 'http://127.0.0.1:3000/calculate',
        success: function(data) {
            removeForm();
            createWalls(data, actualSqft);
        }
    });

}


// function to test if click was within grid #called in onclick handler below
function invalidPoint(p) {
    if (p.x < XMIN ||
        p.y < YMIN ||
        p.y > SCREEN_HEIGHT ||
        p.x  > window.innerWidth - (document.getElementById('inputs').offsetWidth + document.getElementById('boardlist').offsetWidth) - UNIT) {
        return true;
    }
}


// main entry point of the program
function start() {
    var path = new Pathway();
    wall = new Wall();
    pathway = path;
    click = 0;

    // Grab canvas tag add a listen
    document.getElementById('blueprint').addEventListener('click', function(event){

        var point = {
            x: Math.round(Math.round(event.clientX/XUNIT) * XUNIT),
            y: Math.round(Math.round(event.clientY/YUNIT) * YUNIT)
        };

        if (invalidPoint(point)) return;

        if (!click) {
            wallHolder = [];
            click = 1;
            path = new Pathway();
            pathway = path;
            wall = new Wall();
            wall.init(point);
            pathStart = point;
            removeApplicationTitle();
        } else {
            wall.setAndDraw(point);
            if(!path.addWallAndBuildPathForm(wall)) {
                point1 = wall.getPoint1();
                var point2 = wall.getPoint2();
                wall = new Wall();
                wall.update(point2);
                click = 2;
                wallHolder.push(wall);
            } else {
                pathways.push(path);
                drawPath(path.getWalls());
                path = new Pathway();
                click = 0;
            }

        }

    }, false);

    drawBackground();
}
