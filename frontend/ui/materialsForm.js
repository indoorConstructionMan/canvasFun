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
    $('#inputs').children().remove();
}


// creates form title
var createFormTitle = () => {
    var $formtitle = $("<h>", {id: "line-marker"});
    $formtitle.text("Please Input Measurements");
    $('#inputs').append($formtitle);
};


// Height input of form
var createHeightInput = () => {
    var $inputColumn = $('#inputs');
    $inputColumn.append($("<br>"));
    var $heightInput = $("<input>", {
        id: "height-input",
        type: "text",
        placeholder: "Height"
    });

    $inputColumn.append($heightInput);
};


// Create inputs for the wallsInPath
var createWallInputs = (count) => {
    for (var i = 0; i < count; i++) {
        var $wallInput = $("<input>", {id: "measurementInputs", type: "text"});
        $wallInput.css('background-color', colors[i]);
        $('#inputs').append($wallInput);
    }
}


// form button to generate supplies
var createFormButton = () => {
    var $formButton = $('<button>', {
        id: 'formButton',
        type: 'button',
        class: 'w3-button',
        onclick: 'submitForm()'
    });

    $formButton.html("Calculate Materials");
    $('#inputs').append($formButton);
    $('#inputs').append($('<br>'));
};


// inserts the application notification
var addApplicationTitle = () => {
    var $title = $("<h1>", {id: 'line-marker'});
    $title.html('Click blueprint to begin');
    $('#inputs').append($title);
};


// remove the application notification
var removeApplicationTitle = () => {
    $('#line-marker').remove();
};


// Creates all the form and attaches to document
var displayForm = (count) => {
    createFormTitle();
    createHeightInput();
    createWallInputs(count);
    createFormButton();
};
