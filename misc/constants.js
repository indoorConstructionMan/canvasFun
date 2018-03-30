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
//https://www.canva.com/learn/website-color-schemes/
// Good ol' globals
const UNIT = 50;
const POINT_OUTER = 8;
const POINT_INNER = 4;
const LINE_WIDTH = 10;
const LINE_PADDING = LINE_WIDTH/2;
const CANVAS_RATIO = 2/3;
const PADDING = 10;

// Colors
//const BLUEPRINTBLUE = "#262228";
const BLUEPRINTBLUE = "#0375B4";

const BLACK = "#000000";
const WHITE = "#FFFFFF";
const RED = "#E73C18";
const GREEN = "#07fc55";
const PINK = "#fc07ba";
const OFFORANGE = '#E77018';
const DARKRED = '#BB3B1F';
const FORRESTGREEN = '#51BB1F';
const TEAL = "#1F9FBB";
const PURPLE = '#891FBB';
const LIGHTORANGE = '#E7A418';
const OFFYELLOW = '#E7D718';
const LIME = '#8FE718';
const OFFGREEN = '#C3E718';

const colors = [
    FORRESTGREEN,
    PURPLE,
    OFFORANGE,
    TEAL,
    DARKRED,
    PINK,
    LIGHTORANGE,
    GREEN,
    OFFGREEN,
    RED,
    BLACK,
    WHITE,
    BLUEPRINTBLUE
];

// CANVAS SCREEN DIMENSIONS
var SCREEN_WIDTH = 400;
var SCREEN_HEIGHT = 300;

// GRID DISTANCE
var YUNIT = UNIT;
var XUNIT = UNIT;

// single pathways, and the set
var pathways = [];
var pathway;
