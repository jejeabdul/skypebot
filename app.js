var restify = require('restify');
var builder = require('botbuilder');
var request = require('request');
//=========================================================
// Bot Setup
//=========================================================
// Setup Restify Server
var server = restify.createServer();
server.use(restify.plugins.queryParser({
  mapParams: true
}));
server.use(restify.plugins.bodyParser({
  mapParams: true
}));

server.listen(process.env.port || process.env.PORT || 3000, function () {
  console.log('%s listening to %s', server.name, server.url);
});

var connector = new builder.ChatConnector({
  appId: "5227171c-6acb-4aaa-9a14-4e19736fb32c",
  appPassword: "FgL8oVJpo9ukazazuwXwjrM"
});
var bot = new builder.UniversalBot(connector);
server.post('/repos/:owner/:repo/hooks', (req, res, next) => {

  if (!req.is('application/json')) {
    return next(
      new errors.InvalidContentError("Expects 'application/json'")
    );
  }

  // Process posted notification
  var address =
    {
      id: '1505191202170',
      channelId: 'skype',
      user:
      {
        id: '29:1MChe3Vp8MCNVJKL1A3FtCvAhiCfp1I2U0BbxggCboZs',
        name: 'Jeje Abdul Rahman',
      },
      conversation:
      {
        isGroup: true,
        id: '19:89d940f123144dda8e87a916d62ff2c1@thread.skype',
        // id: '19:I2RtYXN0YWcvJDc1Yzg4ZWI0NzhjZjMyNGY=@p2p.thread.skype',
      },
      bot:
      {
        id: '28:5227171c-6acb-4aaa-9a14-4e19736fb32c',
        name: 'goBot',
      },
      serviceUrl: 'https://smba.trafficmanager.net/apis/',
      useAuth: true
    };
  // var address = JSON.parse(req.body.address);
  // var notification = req.body.notification;

  let data = req.body || {};

  if (data['project']) {
    // Send notification as a proactive message
    if (data.object_kind == 'push') {
      console.log(data, 'Hook okeey========<> push');
      var msg = new builder.Message()
        .address(address)
        .text(" Hi... I'm gobot. :D \n\n Event Name : " + data['event_name'] + '\n\n UserName : ' + data['user_name'] + '\n\n Project : ' + data['project']['name'] + '\n\n Default Branch : ' + data['project']['default_branch'] + '\n\n Description : ' + data.commits[0]['message'] + '\n\n Timestamp : ' + data.commits[0]['timestamp']);

    } else if (data.object_kind == 'pipeline') {
      console.log(data['builds'], '=JJ=');
      var msg = new builder.Message()
        .address(address)
        .text(" Ref : " + data['object_attributes']['ref']
        + "\n\n Project : " + data['project']['name']
        + "\n\n Author : " + data['commit']['author']['name']
        + "\n\n Name : " + data['builds'][1]['name']
        + "\n\n==\n\n Build : " + data['builds'][1]['name']
        + "\n\n User : " + data['builds'][1]['user']['name']
        + "\n\n File Name : " + data['builds'][1]['artifacts_file']['filename']
        + "\n\n Size : " + data['builds'][1]['artifacts_file']['size']
        + "\n\n==\n\n Build : " + data['builds'][2]['name']
        + "\n\n User : " + data['builds'][2]['user']['name']
        + "\n\n File Name : " + data['builds'][2]['artifacts_file']['filename']
        + "\n\n Size : " + data['builds'][2]['artifacts_file']['size']
        + "\n\n==\n\n Build : " + data['builds'][3]['name']
        + "\n\n User : " + data['builds'][3]['user']['name']
        + "\n\n File Name : " + data['builds'][3]['artifacts_file']['filename']
        + "\n\n Size : " + data['builds'][3]['artifacts_file']['size']);
    } else {
      var msg = new builder.Message()
        .address(address)
        .text("Sorry your request could not be processed. please try again :( ");
    }

    // =======================
    request('http://192.168.0.97:3000/api/versions', function (error, response, body) {
      console.log('body:', body); // Print the HTML for the Google homepage.
    });

    bot.send(msg, function (err) {
      console.log('Bot success send message');
    });

  }

  res.send(200);
  return next();
}, connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================
String.prototype.contains = function (content) {
  return this.indexOf(content) !== -1;
}

bot.dialog('/', function (session) {
  console.log(session, 'this is wew');
  session.sendTyping();
  setTimeout(function () {
    if (session.message.text.toLowerCase().contains('hello')) {
      session.send(`Hey, How are you?`);
    } else if (session.message.text.toLowerCase().contains('help')) {
      session.send(`How can I help you?`);
    } else if (session.message.text.toLowerCase().contains('sholat')) {
      session.send(`Hayu kita sholat awal waktu guys (mm)`);
    } else {
      session.send(`Sorry I don't understand you... :(`);
    }
  }, 3000);
});

// pipeline
server.post('/pipeline/hooks', (req, res, next) => {
  console.log('aaaak');
});