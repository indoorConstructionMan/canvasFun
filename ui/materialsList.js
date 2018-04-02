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

// if 9 foot walls, go ahead and get board for that
function getTwelves54(w) {

    var ls = wall.getList();
    var w = wall['wall'];
    var remainder = [];

    var twelves54 = 0;
    var wallLength = parseInt(w.value);
    for (var i = 0; i < parseInt(w.height/4.5); i++) {
        wallLength = parseInt(w.value);
        while (wallLength > 0) {
            // if there's scrap, use it
            for (var j = 0; j < remainder.length; j++) {
                if (wallLength < remainder[j]) {
                    wallLength -= remainder[j];
                    remainder.splice(j, 1);
                    break;
                }
            }
            if (wallLength > 0) {
                wallLength -= 12;
                twelves54 += 1;
            }
            if (wallLength < 0) {
                remainder.push(Math.abs(wallLength));
            }
        }
    }
    ls.board['new']['twelves54'].count = twelves54;
    ls.board['scrap'] = remainder;
}


function positive(s) {
    for (var i = 0; i < s.length; i++) {
        if (s[i] > 0) {
            return true
        }
    }
    return false;
}



function calc(wall) {
    var materialList = wall['boardlist'];
    var wallData = wall['wall'];

    // 8 feet only
    var numberOfRows = 2;
    var waste = [];

    var sections = new Array(numberOfRows);

    // assigning length to segments
    for (var i = 0; i < sections.length; i++) {
        // if odd, make positive
        if (i%2) {
            sections[i] = 1*parseInt(wall.getData());
        } else {
            sections[i] = -1*parseInt(wall.getData());
        }

    }

    var pieces = {
        start: 0,
        middle: 0,
        end: 0
    };


}


function findBoard(wall) {

    var materialList = wall['boardlist'];
    var wallData = wall['wall'];
    //materialList.add('nines', 5);
    var numberOfRows = Math.floor(wall.getHeight()/4);
    var waste = [];

    var sections = new Array(numberOfRows);
    for (var i = 0; i < sections.length; i++) {
        sections[i] = parseInt(wall.getValue());
    }

    while (positive(sections)) {

        for (var i = 0; i < sections.length; i++) {
            if (sections[i] > 0) {
                for (var j = 0; j < waste.length; j++) {
                    if (sections[i] <= waste[j]) {
                        sections[i] -= waste[j];
                        waste.splice(j, 1);
                        console.log(waste);
                        break;
                    }
                }
            }
        }

        if (sections[0] == sections[1] && sections[0] == parseInt(wall.getValue())) {

            if (sections[0] <= 4) {
                console.log("added eight");
                materialList.addOne('eights');
                sections[0] -= 8;
                if(sections[0] < 0) {
                    waste.push(Math.abs(sections[0]));
                }
            } else if (sections[0] <= 5) {
                console.log("added ten");
                materialList.addOne('tens');
                sections[0] -= 10;
                if(sections[0] < 0) {
                    waste.push(Math.abs(sections[0]));
                }
            } else if (sections[0] <= 6) {
                console.log("added twelve");
                materialList.addOne('twelves');
                sections[0] -= 12;
                if(sections[0] < 0) {
                    waste.push(Math.abs(sections[0]));
                }
            } else if (sections[0] <= 7) {
                console.log("added 2 eights");
                materialList.addOne('eights');
                materialList.addOne('eights');
                sections[0] -= 8;
                sections[1] -= 8;
                if(sections[0] < 0) {
                    waste.push(Math.abs(sections[0]));
                    waste.push(Math.abs(sections[1]));
                }
            } else if (sections[0] <= 8) {
                console.log("added 2 eights");
                materialList.addOne('eights');
                materialList.addOne('eights');
                sections[0] -= 8;
                sections[1] -= 8;
                if(sections[0] < 0) {
                    waste.push(Math.abs(sections[0]));
                    waste.push(Math.abs(sections[1]));
                }
            } else if (sections[0] <= 9) {
                console.log("added 2 nines");
                materialList.addOne('nines');
                materialList.addOne('nines');
                sections[0] -= 9;
                sections[1] -= 9;
                if(sections[0] < 0) {
                    waste.push(Math.abs(sections[0]));
                    waste.push(Math.abs(sections[1]));
                }
            } else if (sections[0] <= 10) {
                console.log("added 2 tens");
                materialList.addOne('tens');
                materialList.addOne('tens');
                sections[0] -= 10;
                sections[1] -= 10;
                if(sections[0] < 0) {
                    waste.push(Math.abs(sections[0]));
                    waste.push(Math.abs(sections[1]));
                }
            } else if (sections[0] <= 12) {
                console.log("added 2 twelves");
                materialList.addOne('twelves');
                materialList.addOne('twelves');
                sections[0] -= 12;
                sections[1] -= 12;
                if(sections[0] < 0) {
                    waste.push(Math.abs(sections[0]));
                    waste.push(Math.abs(sections[1]));
                }
            }else {
                console.log("added eight for no reason");
                materialList.addOne('eights');
                sections[0] -= 8;
                sections[1] -= 8;
                if(sections[0] < 0) {
                    waste.push(Math.abs(sections[0]));
                }
            }
        }
    }
    materialList.addScrap(waste);
}


function calculateBoard(wall) {
    var w = wall.getWall();
    console.log('calculate board');
    // find out if we are on the last one. If so, skip it
    if (w.p1.x == w.p2.x && w.p1.y == w.p2.y && w.p1.x != 0) {
        // do something useful
        findBoard(wall);
    } else {
        findBoard(wall);
    }
}


// needs to be renamed.
function createWalls(w) {
    var ul = document.createElement('UL');
    ul.setAttribute('id', 'unordered');
    var nameContainer = document.createElement('H1');
    nameContainer.setAttribute('id', 'line-marker');
    var name = document.createTextNode('Materials List: ');
    nameContainer.appendChild(name);
    document.getElementById('inputs').appendChild(nameContainer);
    document.getElementById('inputs').appendChild(ul);
    var boardNames = ["4' x 8'", "4' x 8' Aqua", "4' x 9'", "4' x 10'", "4' x 10' Aqua", "4' x 12'", "4' x 12 CD'", "54 x 12'", "Waste "];
    var i = 0;
    var ls = w;

    for (b in ls) {
        try {
            var wallList = w[0]['boardlist']['board']['new'];
            for (ls in wallList){
                if (wallList[ls].count != 0) {
                    var n = document.createElement('LI');
                    if (i == 8) {
                        n.innerHTML = boardNames[i] + " := " + w[0]['boardlist']['board'].scrap + " Chunk(s).";
                    } else {
                        n.innerHTML = boardNames[i] + " := " + wallList[ls].count + " board(s).";
                    }
                    document.getElementById('unordered').appendChild(n);
                }
                i += 1;
            }
        } catch (err) {
            //console.log(err);
        }
    }
}
