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
    title.appendChild(text);
    document.getElementById('inputs').appendChild(title);
};


// Height input of form
var createHeightInput = function() {
    document.getElementById('inputs').appendChild(document.createElement('br'));
    var h = document.createElement("INPUT");
    h.setAttribute("type", "text");
    h.setAttribute("placeholder", "Height");
    document.getElementById('inputs').appendChild(h);
};


// form button to generate supplies
var createFormButton = function() {
    var formButton = document.createElement('BUTTON');
    formButton.innerHTML = "Calculate materials";
    formButton.setAttribute('id', 'formButton');
    formButton.setAttribute('type', 'button');
    formButton.setAttribute('class', 'w3-button w3-blue');
    formButton.setAttribute('onclick', 'submitForm()');
    document.getElementById('inputs').appendChild(formButton);
    document.getElementById('inputs').appendChild(document.createElement('br'));
};
