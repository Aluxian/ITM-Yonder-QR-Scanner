var EmailController = {
  sendEmailWithGift: function(req, res) {
    var content = req.body;

    var mandrill = require('node-mandrill')('l60khdgbpInq9V2yssovHw');

    var url = 'http://127.0.0.1:1337/gift/' + content.id;

    var options = {
      message: {
        to: [ { email: content.receiverEmail, name: content.receiver } ],
        from_email: 'apphandout@gmail.com',
        subject: 'You received a new gift from ' + content.sender,
        text: 'Hey, you received a new gift ! See it here: ' + url
      }
    };

    mandrill('/messages/send', options, callback);

    function callback(error, response) {
      if (error) console.log( JSON.stringify(error) );
      else console.log(response);
    }
  }
};

module.exports = EmailController;
