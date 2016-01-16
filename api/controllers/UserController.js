/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  loggedInUser: loggedInUser	
};

function loggedInUser(req, res) {
  return getUser().then(sendData);

  function getUser() {
    return User.findOne({ id: req.user.id });
  }

  function sendData(data) {
    return res.json(data);
  }
}

