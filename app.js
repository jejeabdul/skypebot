var restify = require('restify');
var builder = require('botbuilder');
//=========================================================
// Bot Setup
//=========================================================
// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 8080, function () {
  console.log('%s listening to %s', server.name, server.url);
});
// Create chat bot
var connector = new builder.ChatConnector({
  appId: "5227171c-6acb-4aaa-9a14-4e19736fb32c",
  appPassword: "FgL8oVJpo9ukazazuwXwjrM"
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());
//Bot on
bot.on('contactRelationUpdate', function (message) {
  if (message.action === 'add') {
    var name = message.user ? message.user.name : null;
    var reply = new builder.Message()
      .address(message.address)
      .text("Hello %s... Thanks for adding me. Say 'hello' to see some great demos.", name || 'there');
    bot.send(reply);
  } else {
    // delete their data
  }
});
bot.on('typing', function (message) {
  // User is typing
});
bot.on('deleteUserData', function (message) {
  // User asked to delete their data
});
//=========================================================
// Bots Dialogs
//=========================================================
String.prototype.contains = function (content) {
  return this.indexOf(content) !== -1;
}

bot.dialog('/', function (session) {
  console.log('this is wew');
  if (session.message.text.toLowerCase().contains('hello')) {
    session.send(`Hey, How are you?`);
  } else if (session.message.text.toLowerCase().contains('help')) {
    session.send(`How can I help you?`);
  } else if (session.message.text.toLowerCase().contains('nama')) {
    session.send(`Nama kamu siapa?`);
  } else if (session.message.text.toLowerCase().contains('apa')) {
    session.send(`Ada yang bisa saya bantu?`);
  } else if (session.message.text.toLowerCase().contains('game')) {
    session.send(`Sevent paladins aja, seru broow?`);
  } else {
    session.send(`Chatingan mulu, kerja kerja kerja .....`);
  }
});

/**
	 * LIST
	 */
server.get('/repos/:owner/:repo/hooks', (req, res, next) => {
  console.log(req,'Hook okeey',res);
});