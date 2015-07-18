// Yup

var APP_ID = amzn1.echo-sdk-ams.app.2029f02f-9ef4-4453-ad36-39f01cbb33b8;

var SHIT_TALK = [
  "Of course you said that, you're retarded",
  "You're a bitch... my bitch",
  "That bitch be crazy"
];

var AlexaSkill = require('./AlexaSkill');

// Let the Trash Talking begin

var T = function() {
  AlexaSkill.call(this, APP_ID);
}

T.prototype = Object.create(AlexaSkill.prototype);
T.prototype.constructor = T;

T.prototype.eventHandlers.onSessionStarted = function(sessionStartedRequest, session) {
  console.log("Shit talk started" + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
};

T.prototype.EventHandlers.onLaunch = function(launchRequest, session, response) {
  console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
  handleNewFactRequest(response);
};

T.prototype.EventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
  console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
}

T.prototype.intentHandlers = {
    GetNewFactIntent: function (intent, session, response) {
        handleNewFactRequest(response);
    },

    HelpIntent: function (intent, session, response) {
        response.ask("You can ask me to smack talk, or, you can say exit... What can I help you with?");
    }
};

function handleNewFactRequest(response) {
    // Get a random space fact from the space facts list
    var smackIndex = Math.floor(Math.random() * SHIT_TALK.length);
    var smack = SHIT_TALK[smackIndex];

    // Create speech output
    var speechOutput = "Shit, : " + smack;

    response.tellWithCard(speechOutput, "Smack Talk", speechOutput);
}

exports.handler = function(event, context) {
  var smackTalk = new T();
  smackTalk.execute(event, context);
}
