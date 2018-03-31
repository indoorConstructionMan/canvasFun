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

// removes form when screen gets cleared.
function removeForm() {
    var form = document.getElementById('inputs');
    while(form.firstChild) {
        form.removeChild(form.firstChild);
    }
}


// creates form title
var createFormTitle = () => {
    var title = document.createElement('H');
    var text = document.createTextNode("Please Input Measurements");
    title.setAttribute('id', 'line-marker');
    title.appendChild(text);
    document.getElementById('inputs').appendChild(title);
};


// Height input of form
var createHeightInput = function() {
    document.getElementById('inputs').appendChild(document.createElement('br'));
    var h = document.createElement("INPUT");
    h.setAttribute("id", "height-input");
    h.setAttribute("type", "text");
    h.setAttribute("placeholder", "Height");
    document.getElementById('inputs').appendChild(h);
};



// Create inputs for the wallsInPath
var createWallInputs = function(count) {
    for (var i = 0; i < count; i++) {
        var x = document.createElement("INPUT");
        x.style.backgroundColor = colors[i];
        x.setAttribute("id", "measurementInputs");
        x.setAttribute("type", "text");
        document.getElementById('inputs').appendChild(x);
    }
}

// form button to generate supplies
var createFormButton = function() {
    var formButton = document.createElement('BUTTON');
    formButton.innerHTML = "Calculate materials";
    formButton.setAttribute('id', 'formButton');
    formButton.setAttribute('type', 'button');
    formButton.setAttribute('class', 'w3-button');
    formButton.setAttribute('onclick', 'submitForm()');
    document.getElementById('inputs').appendChild(formButton);
    document.getElementById('inputs').appendChild(document.createElement('br'));
};


// inserts the application notification
var addApplicationTitle = function() {
    var form = document.getElementsByClassName('w3-container');
    var title = document.createElement('H1');
    var titleTextNode = document.createTextNode('Click blueprint to begin');
    title.setAttribute('id', 'line-marker');
    title.appendChild(titleTextNode);
    form[0].appendChild(title);
};


// remove the application notification
var removeApplicationTitle = function() {
    var title = document.getElementById("line-marker");
    title.parentNode.removeChild(title);
};


// Creates all the form and attaches to document
var displayForm = function(count) {
    createFormTitle();
    createHeightInput();
    createWallInputs(count);
    createFormButton();
};
