var express = require('express');
var router = express.Router();

const User = require('../models/User/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
    return res.json({success:true, message: "test"});
});

/*
 * Login
 */
router.post('/login', function(req, res) {

  let username = req.body.username;
  let password = req.body.password;

  User.findOne({
    username: username
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({
        success: false,
        message: 'Authentication failed. User not found.'
      });
    } else {
      // check if password matches
      user.comparePassword(password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.sign(user.toJSON(), settings.secret);
          // return the information including token as JSON
          res.json({
            success: true,
            token: 'JWT ' + token
          });
        } else {
          res.status(401).send({
            success: false, 
            message: 'Authentication failed. Invalid password.'
          });
        }
      });
    }
  });
});

/*
 * Register
 */
router.post('/register', function(req, res) {
    const { body } = req;
    const {
        username,
        password,
        firstName,
        lastName,
        location,
        team,
        creationDate,
        accountType,
    } = body;

    console.log(body);

  if (!username || !password || !firstName || !lastName 
      || !location || !team ) {
        console.log("empty");
        return res.json({
          success: false,
          message: 'Error: Missing fields. Enter all of the fields.'
        });
  } 

    console.log("here");

    let f_username = username.toLowerCase();
    var newUser = new User({
      username: f_username,
      password: password,
      firstName: firstName,
      lastName: lastName,
      location: location,
      team: team
    });
    // save the user
    newUser.save(function(err) {
      console.log("here");
      if (err) {
        return res.json({
          success: false, message: 'Username already exists.'
        });
      }
      return res.json({
        success: true,
        message: 'Successful created new user.'
      });
    });

});

module.exports = router;

