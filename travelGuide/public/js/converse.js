// The ConversationPanel module is designed to handle
// all display and behaviors of the conversation column of the app.
/* eslint no-unused-vars: "off" */
/* global Api: true, Common: true*/

var Converse = (function() {

    // Publicly accessible methods defined
    return {
        init: init,
        inputKeyDown: inputKeyDown,
        sendMessage: sendMessage
    };

    // Initialize the module
    function init() {
        Api.getSessionId(function() {
            Api.sendRequest('', null);
        });
    }

    // Checks if the given typeValue matches with the user "name", the Watson "name", or neither
    // Returns true if user, false if Watson, and null if neither
    // Used to keep track of whether a message was from the user or Watson
    function isUserMessage(typeValue) {
        if (typeValue === settings.authorTypes.user) {
            return true;
        } else if (typeValue === settings.authorTypes.watson) {
            return false;
        }
        return null;
    }


    function sendMessage(text) {
        // Send the user message
        Api.sendRequest(text);
    }

    // Handles the submission of input
    function inputKeyDown(event, inputBox) {
        // Submit on enter key, dis-allowing blank messages
        if (event.keyCode === 13 && inputBox.value) {
            sendMessage(inputBox.value);
            // Clear input box for further messages
            inputBox.value = '';
            // Common.fireEvent(inputBox, 'input');
        }
    }
}());