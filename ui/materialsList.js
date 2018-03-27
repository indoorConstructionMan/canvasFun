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
    boardList.twelves54 = twelves54;
    boardList.waste = remainder;
}


// clears boardList
function clearBoardList() {
    for (board in boardList) {
        if (board.isArray) {
            boardList[board] = [];
        } else {
            boardList[board] = 0;
        }
    }
}


// goes through a wall, and adds board and scrap to boardList object
function getBoard(w) {
    // need to do something with this extra height
    var r = w.height % 4;
    var remainder = [];
    for (var i = 0; i < Math.floor(w.height/4); i++) {
        wallLength = parseInt(w.value);
        while (wallLength > 0) {
            // if there's scrap, use it
            for (var j = 0; j < remainder.length; j++) {
                if (wallLength <= remainder[j]) {
                    wallLength -= remainder[j];
                    remainder.splice(j, 1);
                    break;
                }
            }
            if (wallLength > 0) {
                if (wallLength <= 8) {
                    wallLength -= 8;
                    boardList.eights += 1;
                } else if (wallLength <= 9) {
                    wallLength -= 9;
                    boardList.nines += 1;
                } else if (wallLength <= 10) {
                    wallLength -= 10;
                    boardList.tens += 1;
                } else {
                    wallLength -= 12;
                    boardList.twelves += 1;
                }
            }
            if (wallLength < 0) {
                remainder.push(Math.abs(wallLength));
            }
        }
    }
    boardList.waste = remainder;
}

// gets all other board required.
function populateBoard(wall) {

    var h = wall.height;
    switch (h) {
        case '9':
            getTwelves54(wall);
            break;
        default:
            getBoard(wall);
            break;
    }
}

// for each board added to the list, it prints them out.
function createList() {
    var ul = document.createElement('UL');
    ul.setAttribute('id', 'unordered');
    document.getElementById('inputs').appendChild(ul);
    var boardNames = ["4' x 8'", "4' x 8' Aqua", "4' x 9'", "4' x 10'", "4' x 10' Aqua", "4' x 12'", "4' x 12 CD'", "54 x 12'", "Waste: "];
    var i = 0;
    for (board in boardList) {
        if (boardList[board] != 0) {
            var n = document.createElement('LI');
            if (i == 8) {
                n.innerHTML = boardNames[i] + " := " + boardList[board] + " Chunk(s).";
            } else {
                n.innerHTML = boardNames[i] + " := " + boardList[board] + " board(s).";
            }
            document.getElementById('unordered').appendChild(n);
        }
        i += 1;
    }
}
