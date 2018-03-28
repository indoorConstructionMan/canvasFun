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
// BUG: scaling is an issue.

require('./misc/constants.js');
require('./ui/drawCanvas.js');
require('./misc/log.js');
require('./ui/materialsForm.js');
require('./ui/materialsList.js');
require('./model/Pathway.js');
require('./model/BoardingList.js');
require('./model/Wall.js');


// import functions from other local files.
function require(locationInProject) {
    var imported = document.createElement('script');
    imported.src = locationInProject;
    document.head.appendChild(imported);
}


// run this when dom has loaded.
window.onload = function() {
    console.log('Welcome to drywall calculator');
    start();
}


// Issue with value?
function submitForm() {
    var inputWalls = document.querySelectorAll('INPUT');

    var i = 0;
    for (w in pathway.path['walls']) {
        var setWalls = pathway.path['walls'][w];
        setWalls.getWall()['height'] = inputWalls[0].value;
        setWalls.getWall()['value'] = inputWalls[1].value;
        populateBoard(setWalls);
        i += 1;
    }
    createWalls(pathway.path['walls']);
}


// main entry point of the program
function start() {
    var path = new Pathway();
    var wall = new Wall();
    pathway = path;
    // Grab canvas tag add a listen
    document.getElementById('blueprint').addEventListener('click', function(event){

        var point = {
            x: Math.round(event.clientX/UNIT) * UNIT,
            y: Math.round(event.clientY/UNIT) * UNIT
        };


        if (wall.listExist()) {
            wall.setPoint2(point);
            drawWall(wall);
            path.addWall(wall);
            if(path.checkComplete()) {
                path.buildPathForm();
            }
            var point2 = wall.getPoint2();
            wall = new Wall();
            wall.setPoint1(point2);
            wall.attachList(new BoardingList());
        } else {
            wall.setPoint1(point);
            drawPoint(wall.getPoint1());
            wall.attachList(new BoardingList());
        }

    }, false);

    drawBackground();
}
