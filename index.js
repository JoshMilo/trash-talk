// Alexa SDK for JavaScript v1.0.00
// Copyright (c) 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved. Use is subject to license terms.

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Space Geek for a space fact"
 *  Alexa: "Here's your space fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = "amzn1.echo-sdk-ams.app.6380f2eb-55ec-4937-a6d1-c3fe8982d21b"; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing space facts.
 */
var SPACE_FACTS = [
  "I don't want to talk to you no more, you empty-headed animal food trough wiper! I fart in your general direction! Your mother was a hamster and your father smelt of elderberries!",
  "Let's start with the obvious... 'scuse me, is that your nose or did a bus park on your face?",
  "Is it true when you were born the doctor turned around and slapped your mother?",
  "If my dog had a face like yours I'd shave his ass and teach him to walk backwards.",
  "I'll use small words so that you'll be sure to understand, you warthog faced buffoon.",
  "You pompous, stuck-up, snot-nosed, English, giant, twerp, scumbag, fuck face dickhead, fuck",
  "Why, you stuck up, half-witted, scruffy-looking Nerf herder.",
  "You clinking, clanking, clattering collection of caligenous junk!",
  "You shit kicking stinky, horse-manure-smellin' motherfucker",
  "You dirt-eating piece of slime! You scum-sucking pig! You son of a motherless goat!",
  "How art thou, thou globby bottle of cheap, stinking chip oil? You eunuch jelly thou!",
  "You no-business, born-insecure, junkyard motherfucker!",
  "What the hell are you? You're a fuckin' secretary. Fuck you. That's my message to ya: fuck you and you can kiss my ass and if you don't like it baby I'm going across the street to Jerry Graff, period, fuck you.",
  "You're an emotional fucking cripple. Your soul is dog shit Every single fucking thing about you is ugly.",
  "You are physically repulsive, intellectually retarded, you're morally reprehensible, vulgar, insensitive, selfish, stupid, you have no taste, a lousy sense of humor and you smell. You're not even interesting enough to make me sick.",
  "I don't like your jerk-off name. I don't like your jerk-off face. I don't like your jerk-off behavior, and I don't like you... jerk-off.",
  "You're a cunt. You're a cunt now, and you've always been a cunt. And the only thing that's going to change is that you're going to be an even bigger cunt. Maybe have some more cunt kids.",
  "It looks to me like the best part of you ran down the crack of your mama's ass and ended up as a brown stain on the mattress.",
  "You're just the afterbirth, Eli. You slithered out of your mother's filth. They should have put you in a glass jar on a mantlepiece.",
  "You are a sad, strange little man, and you have my pity.",
  "Robyn wouldn't piss on your gums if your teeth were on fire.",
  "There is a name for you, ladies, but it isn't used in high society... outside of a kennel.",
  "You're one... ugly motherfucker",
  "Honey, you got reeeal ugly!",
  "You, you're okay. This one: real fucking ugly.",
  "Take this quarter, go downtown, and have a rat gnaw that thing off your face!",
  "I know, there's a problem with your face.",
  "You're incapable of running this city. SIT your five-dollar ass down before I make change.",
  "What you've just said is one of the most insanely idiotic things I have ever heard. At no point in your rambling, incoherent response were you even close to anything that could be considered a rational thought. Everyone in this room is now dumber for having listened to it. I award you no points, and may God have mercy on your soul.",
  "Look up 'idiot' in the dictionary. You know what you'll find? No! The definition of the word idiot, which you fucking are!",
  "Allow me to pop a jaunty little bonnet on your purview and ram it up your ass with a lubricated horse cock!"
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * SpaceGeek is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var SpaceGeek = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
SpaceGeek.prototype = Object.create(AlexaSkill.prototype);
SpaceGeek.prototype.constructor = SpaceGeek;

SpaceGeek.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

SpaceGeek.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
SpaceGeek.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

SpaceGeek.prototype.intentHandlers = {
    GetNewFactIntent: function (intent, session, response) {
        handleNewFactRequest(response);
    },

    HelpIntent: function (intent, session, response) {
        response.ask("you can say exit... What can I help you with?");
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random space fact from the space facts list
    var factIndex = Math.floor(Math.random() * SPACE_FACTS.length);
    var fact = SPACE_FACTS[factIndex];

    // Create speech output
    var speechOutput = "Hey " + fact;

    response.tellWithCard(speechOutput, "SpaceGeek", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the SpaceGeek skill.
    var spaceGeek = new SpaceGeek();
    spaceGeek.execute(event, context);
};
