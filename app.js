var restify = require('restify');
var builder = require('botbuilder');
var request = require('request');
require('dotenv-extended').load();

// Setup Restify Server
var server = restify.createServer();
server.use(restify.plugins.bodyParser());
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Serve the embded HTML chat bot on our index.html page. Users will interact w/ the bot there.
// Look in the web folder and grab the index.html page
server.get(/\/?.*/, restify.plugins.serveStatic({
    directory: './web',
    default: 'index.html'
}));

// Listen for messages from users 
server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, '/');

// Set up LUIS connection
var model = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/' + process.env.LUIS_ID + '?subscription-key=' + process.env.LUIS_KEY + '&verbose=true&timezoneOffset=0&q='
var recognizer = new builder.LuisRecognizer(model)
var dialog = new builder.IntentDialog({ recognizers: [recognizer] });

bot.dialog('/', dialog)
    .onDefault((session, results) => {
        session.send("Sorry, I didn't understand that.")
        session.endDialog()
    })
    .matches('Quote', [
        function (session) {
            request('http://13.90.251.217', function (error, response, body) {
                console.log('error: ', error); //Print the error if one occurred
                console.log('statusCode: ', response && response.statusCode); //Print the response status code if a response was received
                console.log('body: ', body); //Print the HTML for the bot homepage.
                session.send(body);
                session.endDialog();
            });
        }
    ])
    .matches('Greeting', [
        function (session) {
            session.send("Hello! I am not your average 'artificially intelligent' chat bot. " + 
            "I use a Recurrent Neural Network (RNN) to generate text that will look like the data it was trained on. " + 
            "I've been trained on a dataset of the complete works of William Shakespeare. " + 
            "Ask me for a 'Quote' and I will respond with sample content inspired by the greatest!");
            session.endDialog()
        }
    ])
