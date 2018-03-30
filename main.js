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

// BUG: Points exist outside GRID
// BUG: click between build form and submit form
// BUG: dynamic stuff added to form just goes past the form.

require('./misc/constants.js');
require('./ui/drawCanvas.js');
require('./misc/log.js');
require('./ui/materialsForm.js');
require('./model/BoardingList.js');
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
    drawBackground();
    start();
}


$(document).ready(function() {
        $(window).resize(function() {
            drawBackground();
        }
    );
});


// onclick for clear button it resets screen on canvas
function reset() {
    removeForm();
    drawBackground();
    click = 0;
}


// onclick handler for materials submit Form
function submitForm() {
    var inputWalls = document.querySelectorAll('INPUT');
    var setWalls = pathway.getWalls();

    for (w in setWalls) {
        setWalls[w].setHeight(inputWalls[0].value);
        setWalls[w].setValue(inputWalls[1].value);
        calculateBoard(setWalls[w]);
    }
    removeForm();
    createWalls(setWalls);
}


// main entry point of the program
function start() {
    var path = new Pathway();
    var wall = new Wall();
    pathway = path;
    var click = 0;

    // Grab canvas tag add a listen
    document.getElementById('blueprint').addEventListener('click', function(event){

        var point = {
            x: Math.round(Math.round(event.clientX/XUNIT) * XUNIT),
            y: Math.round(Math.round(event.clientY/YUNIT) * YUNIT)
        };


        if (!click) {
            click = 1;
            path = new Pathway();
            pathway = path;
            wall = new Wall();
            wall.init(point);
        } else {
            wall.setAndDraw(point);
            if(!path.addWallAndBuildPathForm(wall)) {
                var point2 = wall.getPoint2();
                wall = new Wall();
                wall.update(point2);
                console.log(path);
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
