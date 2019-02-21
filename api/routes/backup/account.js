var express = require('express');
var router = express.Router();

const User = require('../models/User/User');
const UserSession = require('../models/User/UserSession');

/* GET users listing. */
router.get('/', function(req, res, next) {
    return res.json({success:true, message: "test"});
});

/*
 * Token authentication
 */
router.get('/verify', function (req, res, next) { 
    //Get the token
    //Verify the token is one of a kind and is valid

    const { query } = req;
    const { token } = query;
    //?token = test

    UserSession.find({
        _id: token,
        isDeleted: false
    }, (err, sessions ) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Bad token.'
            });
        }

        if (sessions.length != 1) {
            return res.send({
                success: false,
                message: 'Error: Bad token.'
            }); 
        } else {
            return res.send({
                success: true,
                message: 'Good token.'
            })
        }
    });
});

/*
 * SignIn
 */
router.post('/login', function (req, res, next) { 
    console.log("here");
    const { body } = req;
    const {
        username,
        password,
        firstName,
    } = body;

    if (!username) {
        return res.send( {
            success:false,
            message: 'Error: Username cannot be empty.'
        });
    }
    if (!password) {
        return res.send( {
            success:false,
            message: 'Error: Password cannot be empty.'
        });
    }

    let formattedUsername = username.toLowerCase();

    User.find({
        username: formattedUsername
    }, (err, users) => {
        if (err) {
            return res.send ({
                success: false,
                message: err
            });
        }
        if (users.length != 1) {
            return res.send ({
                success: false,
                message: 'Error: Invalid'
            });
        }
        const user = users[0];

        if (!user.validPassword(password)) {
            return res.send ({
                success: false,
                message: 'Error: Password is invalid.'
            });
        }

        //Otherwise if valid
        const userSession = new UserSession();
        userSession.userId = user._id;
        userSession.save((err, doc) => {
            if (err) {
                return res.send ({
                    success: false,
                    message: err
                });
            }

            return res.send({
                success: true,
                message: 'Valid sign in',
                token: doc._id
            });
        });

    });
});

/*
 * Signup
 */
router.post('/signup', function (req, res, next) { 
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
        isDeleted
    } = body;

    if (!username) {
        return res.send( {
            success:false,
            message: 'Error: Username cannot be empty.'
        });
    }
    if (!firstName) {
        return res.send( {
            success:false,
            message: 'Error: First Name cannot be empty.'
        });
    }
    if (!lastName) {
        return res.send( {
            success:false,
            message: 'Error: Last Name cannot be empty.'
        });
    }
    if (!location) {
        return res.send( {
            success:false,
            message: 'Error: Location cannot be empty.'
        });
    }
    if (!team) {
        return res.send( {
            success:false,
            message: 'Error: Team cannot be empty.'
        });
    }

    let formattedUsername = username;
    formattedUsername = formattedUsername.toLowerCase();
    User.find({
        username: formattedUsername
    }, (err, previousUsers) => {
        if (err) {
            return res.send({
                success: false,
                message:'Error: Server Error'
            });
        } else if (previousUsers.length > 0) {
            console.log(previousUsers);
            return res.send({
                success: false,
                message:'Error: User account already exists.'
            });
        } else {
            //Save the new user
            const newUser = User();
            newUser.username = formattedUsername;
            newUser.firstName = firstName;
            newUser.lastName = lastName;
            newUser.accountType = accountType;
            newUser.password = newUser.generateHash(password);
            
            newUser.save((err, user) => {
                if (err) {
                    return res.send( {
                        success:false,
                        message:'Error: Server error'
                    });
                }
                else {
                    //otherwise, if successful
                    return res.send( {
                        success:true,
                        message:'Success: User signed up.'
                    });
                }
            });
        }
    });
});


module.exports = router;