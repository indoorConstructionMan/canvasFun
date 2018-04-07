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

// creates the list from the data.
function createWalls(w) {
    var ul = document.createElement('UL');
    ul.setAttribute('id', 'unordered');
    var nameContainer = document.createElement('H1');
    nameContainer.setAttribute('id', 'line-marker');
    var name = document.createTextNode('Materials List: ');
    nameContainer.appendChild(name);
    document.getElementById('inputs').appendChild(nameContainer);
    document.getElementById('inputs').appendChild(ul);

    var totalSqft = 0;

    var boardNames = ['','','','','','','','', "4' x 8'", "4' x 9'", "4' x 10'", '', "4' x 12'"];
    var i = 0;
    for (ele in w) {
        for (b in w[ele]['wall']) {
            if (b == 'boardList') {
                var newBoard = w[ele]['wall'][b];
                for (item in newBoard) {
                    for (j in newBoard[item]['new']) {
                        if (newBoard[item]['new'][j].count != 0) {
                            totalSqft += newBoard[item]['new'][j].sqft * newBoard[item]['new'][j].count;
                            var n = document.createElement('LI');
                            n.innerHTML = boardNames[newBoard[item]['new'][j].length] + " : " + newBoard[item]['new'][j].count + " board(s).";
                            document.getElementById('unordered').appendChild(n);
                        }
                    }
                }
            }
        }
    }
    var x = document.createElement('H');
    var v  = "Total Square Footage: " + totalSqft;
    var t = document.createTextNode(v);
    x.setAttribute('id', 'line-marker');
    x.setAttribute('type', 'text');
    x.appendChild(t);
    document.getElementById('inputs').appendChild(x);
}
