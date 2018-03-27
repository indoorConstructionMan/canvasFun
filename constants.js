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
SOFTWARE.

*/

// Good ol' globals
const UNIT = 50;
const POINT_OUTER = 8;
const POINT_INNER = 4;
const LINE_WIDTH = 10;
const SCREEN_WIDTH = 1200;
const SCREEN_HEIGHT = 1100;
const PADDING = 10;

const BLUEPRINTBLUE = "#d3d3d3";
const BLACK = "#000000";
const WHITE = "#FFFFFF";

var points = [];
var stored_points = [];

var walls = [];
var boardlists = [];

var symbol = [
    'x',
    'y',
    'z',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l'
];



var boardList = {
    eights: 0,
    eightsAqua: 0,
    nines: 0,
    tens: 0,
    tensAqua: 0,
    twelves: 0,
    twelvesCd: 0,
    twelves54: 0,
    // pieces x 4'
    waste: []
};



var getWall = function() {
    return {
        loaded: false,
        value: 0,
        height: 0,
        bdft: 0,
        point1: {
            x: 0,
            y: 0,
        },
        point2: {
            x: 0,
            y: 0,
        }
    };
}
