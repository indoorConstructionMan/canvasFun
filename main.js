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

// BUG: letters need position adjustment on angled lines.
// BUG: It won't scale when clicking maximize window.
// BUG: Drawing paths is very buggy, Path closes when path is not complete
// BUG: Clear button clears elements, but remembers and continues path.
// BUG: If form gets too large, it litearlly streches the canvas
// BUG: Only creates one wall for multi point wall if false positive

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


// onclick for clear button it resets screen on canvas
function reset() {
    removeForm();
    drawBackground();
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
            wall.init(point);
        } else {
            wall.setAndDraw(point);
            if(!path.addWallAndBuildPathForm(wall)) {
                var point2 = wall.getPoint2();
                wall = new Wall();
                wall.update(point2);
            } else {
                pathways.push(path);
                path = new Pathway();
                click = 0;
            }
        }

    }, false);

    drawBackground();
}
