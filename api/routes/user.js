var express = require('express');
var router = express.Router();

const passport = require('passport');
require('../config/passport')(passport);

const jwt  = require('jsonwebtoken');
const User = require('../models/User/User');
const settings = require('../config/settings');

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

  const user = new User();

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
router.post('/register', function(req, res,next) {
    const { body } = req;
    const {
        username,
        password,
        firstName,
        lastName,
        location,
        team,
    } = body;

  if (!username || !password || !firstName || !lastName 
      || !location || !team ) {
        console.log("empty");
          res.send( {
          success: false,
          message: 'Error: Missing fields. Enter all of the fields.'
        });
  } 

    let f_username = username.toLowerCase();
    const newUser = new User();
      newUser.username= f_username;
      newUser.password= newUser.generateHash(password);
      newUser.firstName= firstName;
      newUser.lastName= lastName;
      newUser.location= location;
      newUser.team= team;
    // save the user
    
      newUser.save((err) => {
      if (err) {
        res.send( {
          success: false,
          message: 'Username already exists.'
        });
      } else {
        res.send( {
          success: true,
          message: 'Successful created new user.'
        });
      }
    });

});

module.exports = router;
