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
var APP_ID = undefined; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

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
  "You stuck up, half-witted, scruffy-looking Nerf herder.",
  "You clinking, clanking, clattering collection of caligenous junk!",
  "You shit kicking... stinky... horse-manure-smellin'... motherfucker",
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
  "There is a name for you ladies, but it isn't used in high society... outside of a kennel.",
  "You're one... ugly motherfucker",
  "Honey, you got reeeal ugly!",
  "Take this quarter, go downtown, and have a rat gnaw that thing off your face!",
  "I know, there's a problem with your face.",
  "You're incapable of running this city. SIT your five-dollar ass down before I make change.",
  "What you've just said is one of the most insanely idiotic things I have ever heard. At no point in your rambling, incoherent response were you even close to anything that could be considered a rational thought. Everyone in this room is now dumber for having listened to it. I award you no points, and may God have mercy on your soul.",
  "Look up 'idiot' in the dictionary. You know what you'll find? No! The definition of the word idiot, which you fucking are!",
  "Allow me to pop a jaunty little bonnet on your purview and ram it up your ass with a lubricated horse cock!",
  "Why don't you go home and fuck your mother some more?",
  "Like I'm gonna put a bullet hole in your fucking forehead, and I'm gonna fuck the brain hole!",
  "I can see you right now in the kitchen, bending over a hot stove. But I can't see the stove.",
  "You're a lot of woman, you know that? Yeah, wanna make 14 dollars the hard way?",
  "If I wanted a joke, I'd follow you into the john and watch you take a leak.",
  "I'm sorry, I'm sorry. Actually, what I said was... HOW WOULD YOU LIKE TO SUCK MY BALLS, MR. GARRISON?",
  "Your mom goes to college.",
  "Nice wig, Janis. What's it made of? Your mom's chest hair!?",
  "Yeah, I have a question. Does Barry Manilow know that you raid his wardrobe?",
  "I think of a man, and I take away reason and accountability.",
  "You should clone yourself... So you can go fuck yourself!",
  "I tea-bagged your drum set!",
  "You two are just dumber than a bag of hammers!",
  "You climb obstacles like old people fuck. Do you know that, Private Pyle?",
  "I crap bigger than you!",
  "I used to fuck guys like you in prison.",
  "I call that bold talk for a one-eyed fat man.",
  "Fill your hands, you son of a bitch!",
  "Hey, laser lips, your mama was a snow blower."
  "I can hear you breathing you fuck. You listening? Your mother sucks fucking big fucking elephant dicks... you got that?",
  "Fuck your father in the shower and then have a snack? Are you going to charge me dickhead?",
  "Fuck face? I like that one Errol. I'll have to remember that one next time I'm climbing off yer mum."
  "Oh, this your wife, huh? A lovely lady. Hey baby, you must've been something before electricity.",
  "You're so fat I had to roll you in flour and look for the wet spot. Motherfucker, if you wanna fuck you you gotta slap your thigh and ride the wave in.",
  "The power grid was shut off by dickless here. Yes, it's true. This man has no dick.",
  "Shut up, idiot! Moron! Pus Licker! Fart Smeller! You eat dog crap for breakfast, geek! You play ball like a giiiirlllll!",
  "People who talk in metaphors oughta shampoo my crotch.",
  "Never seen so many backwards ass country fuckers in my life.",
  "You're an inanimate fucking object!",
  "You stupid, ignorant son of a bitch, dumb bastard. Jesus Christ. I've met some dumb bastards in my time but you outdo them all.",
  "Where did you learn your trade, you stupid fucking cunt, you idiot? Who ever told you that you could work with men? Oh, I'm gonna have your job, shithead.",
  "Oh, right! To call you stupid would be an insult to stupid people!",
  "Hey, Tommy, if I was gonna break your balls, I'd tell you to go home and get your shine box. ...Now go home and get your fucking shine box.",
  "I want to tell you what a cheap, lying, no-good, rotten, four-flushing, low-life, snake-licking, dirt-eating, inbred, overstuffed, ignorant, blood-sucking, dog-kissing, brainless, dickless, hopeless, heartless, fat-ass, bug-eyed, stiff-legged, spotty-lipped, worm-headed sack of monkey shit you are!",
  "The day I need a friend like you, I'll just have myself a little squat and shit one out.",
  "I'll rip out your eyes and piss on your brain.",
  "I'll shove that bat up your ass and turn you into a popsicle.",
  "Listen you snot-nose little fuck I was takin' shrapnel in Khe Sanh when you were crappin' in your hands and rubbin' it on your face.",
  "Here's the thing. I don't give a tuppenny fuck about your moral conundrum, you meat-headed shit-sack.",
  "Are you gonna bark all day little doggie? Or are you gonna bite?",
  "That's what I thought. You're a gutless turd.",
  "You look like the vermin-ridden son of a bitch you are.",
  "I bet you're the kind of guy that would fuck a person in the ass and not even have the goddamn common courtesy to give him a reach-around."
  "Holy hell, son, you're about as useful as a cock-flavored lollipop!",
  "Did you just call me a fuck-ass? You can go suck a fuck.",
  "Hey, Frank, you're a piece of shit. You know what I'm taking about about, you fucking cockroach.",
  "You want to know who's son you are? ...You're the son of a thousand fathers, all bastards like you.",
  "You are a smelly pirate hooker.",
  "You look like a blueberry.",
  "Why don't you go back to your home on Whore Island?",
  "First, take a big step back... and literally, FUCK YOUR OWN FACE!",
  "You're the problem! You're the fucking problem you fucking Dr White honkin' jam-rag fucking spunk-bubble! I'm telling you Bitch you keep looking at me I'll put you in the fucking ground, promise you!",
  "Shut up, cunt. You louse. You got some fuckin' neck ain't you. Retired? Fuck off, you're revolting. Look at your suntan, it's leather, it's like leather man, your skin. We could make a fucking suitcase out of you. Like a crocodile, fat crocodile, fat bastard. You look like fucking Idi Amin, you know what I mean? Stay here? You should be ashamed of yourself. Who do you think you are? King of the castle? Cock of the walk?",
  "Kiss my sweaty balls, you fat fuck.",
  "Shut up, you Teutonic twat!",
  "Shut that cunt's mouth or I'll come over there and fuckstart her head!",
  "You cock-juggling thundercunt!",
  "Hey, try not to suck any dick on the way through the parking lot!",
  "Stick your cock up her ass, you motherfucking worthless cocksucker.",
  "Shit-eating son-of-a-bitch! Bastard, douche-bag, twat, numb-nuts, dickhead, BITCH!",
  "Boy, I wouldn't give a squirt of piss for your ass right now.",
  "For me, you're somewhere between a cockroach and that white stuff that accumulates at the corner of your mouth when you're really thirsty.",
  "You're part eggplant. Ohhh! Huh? Hey! Hey! Hey! You're a cantaloupe.",
  "Y'know, I've come across a lot of psychos, but none as fucking boring as you. You are a real boring fuck. Sorry, sorry, I know you disapprove of swearing so I'll sort that out. You are a boring F, star, star, CUNT!",
  "Kiss my sweaty balls, you fat fuck.",
  "If I had a dick, this is where I'd tell you to suck it!",
  "And furthermore, you can all go fuck yourselves."
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
    var speechOutput = fact;

    response.tellWithCard(speechOutput, "SpaceGeek", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the SpaceGeek skill.
    var spaceGeek = new SpaceGeek();
    spaceGeek.execute(event, context);
};
