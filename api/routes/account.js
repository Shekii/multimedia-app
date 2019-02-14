var express = require('express');
var router = express.Router();

const User = require('../models/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
    return res.json({success:true, message: "test"});
});

//SignIn
router.get('/signin', function (req, res, next) { 
    return res.json({success: true});
});

//SignOut
router.get('/signout', function (req, res, next) { 
    return res.json({success: true});
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
        isDeleted
    } = body;

    if (!username) {
        return res.json( {
            success:false,
            message: 'Error: Username cannot be empty.'
        });
    }
    if (!firstName) {
        return res.json( {
            success:false,
            message: 'Error: First Name cannot be empty.'
        });
    }
    if (!lastName) {
        return res.json( {
            success:false,
            message: 'Error: Last Name cannot be empty.'
        });
    }
    if (!location) {
        return res.json( {
            success:false,
            message: 'Error: Location cannot be empty.'
        });
    }
    if (!team) {
        return res.json( {
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
            return res.json( {
                success:false,
                message:err
            });
        } else if (previousUsers) {
            return res.json( {
                success:false,
                message:'Error: User already exists, try a different username'
            });
        }
    });

        //Save the new user
        const newUser = User();
        newUser.username = formattedUsername;
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.password = newUser.generateHash(password);
        
        newUser.save((err, user) => {
            if (err) {
                return res.json( {
                    success:false,
                    message:'Error: Server error'
                });
            }
            //otherwise, if successful
            return res.json( {
                success:true,
                message:'Success: User signed up.'
            });

        });
});

module.exports = router;