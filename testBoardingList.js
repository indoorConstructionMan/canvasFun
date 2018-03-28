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

/*
this.board = {
    new : {
        eights: {sqft: 32, length: 8, count: 0},
        eightsAqua: {sqft: 32, length: 8, count: 0},
        nines: {sqft: 36, length: 9, count: 0},
        tens: {sqft: 40, length: 10, count: 0},
        tensAqua: {sqft: 40, length: 10, count: 0},
        twelves: {sqft: 48, length: 12, count: 0},
        twelvesCd: {sqft: 48, length: 12, count: 0},
        twelves54: {sqft: 54, length: 12, count: 0},
    }, scrap: [2,3,51,4]
}
 Use this board for the tests

*/
function testAdd() {
    var x = new BoardingList();
    var i = 0;
    for (board in x.new) {
        x.add(board, i);
        i += 1;
    }
    i = 0;
    for (board in x.new) {
        if (x.new[board].count == i) {
            i += 1;
        } else {
            console.log("testGetSqftWaste(): Failed at " + x.new[board].count);
        }
    }
    console.log("testGetSqftWaste(): Passed");
}


// test method
function testGetSqft() {
    var sqftAnswer = [32, 32, 36, 40, 40, 48, 48, 54];
    var g = new BoardingList();
    var i = 0;
    for (b in g.board.new) {
        if (g.board.new[b].sqft != sqftAnswer[i]) {
            console.log("testGetSqft(): Failed at => " + g.board.new[b]);
        }
        i+=1;
    }
    console.log("testGetSqft(): Passed");
}


function testGetSqftWaste() {
    var sum = 0;
    for (ele in new BoardingList().scrap) {
        sum += ele;
    }

    if (sum == 240) {
        console.log("testGetSqftWaste(): Failed");
    } else {
        console.log("testGetSqftWaste(): Passed");
    }
}
