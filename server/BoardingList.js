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

function BoardingList() {
    this.board = {
        new : {
            '8': {sqft: 32, length: 8, count: 0},
            '8A': {sqft: 32, length: 8, count: 0},
            '9': {sqft: 36, length: 9, count: 0},
            '10': {sqft: 40, length: 10, count: 0},
            '10A': {sqft: 40, length: 10, count: 0},
            '12': {sqft: 48, length: 12, count: 0},
            '12CD': {sqft: 48, length: 12, count: 0},
            '1254': {sqft: 54, length: 12, count: 0},
        }, scrap: []
    }
}


// returns list
BoardingList.prototype.getList = function() {
    return this.board.new;
};


// returns boardft of current list.
BoardingList.prototype.getSqft = function() {
    var sum = 0;
    for (b in this.board.new) {
        sum += this.board.new[b].sqft * this.board.new[b].count;
    }
    return sum;
};


// returns boardft of current list.
BoardingList.prototype.getSqftWaste = function() {
    var sum = 0;
    for (b in this.board.scrap) {
        sum += this.board.scrap[b]*4;
    }
    return sum;
};


// add value to the list.
BoardingList.prototype.add = function(board, value) {
    this.board.new[board].count += value;
};


// add scrap to the list.
BoardingList.prototype.addScrap = function(scrap) {
    this.board.scrap.push(scrap);
};


// add 1 to the list.
BoardingList.prototype.addOne = function(board) {
    this.add(board, 1);
};


// get linear feet
BoardingList.prototype.getLinearft = function(value) {
    var sum = 0;
    for (b in this.board) {
        sum += this.board.new[b] * this.board.new.count;
    }
    return sum;
};


// empty list
BoardingList.prototype.empty = function(value) {
    for (b in this.board) {
        this.board[b].count = 0;
    }
    this.board.scrap = [];
};

module.exports = BoardingList;
