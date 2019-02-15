const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  username: {
      type: String,
      unique: true,
      required: true
  },
  password: {
      type: String,
      required: true
  },
  firstName: {
      type: String,
      default: ''
  },
  lastName: {
      type: String,
      default: ''
  },
  location: {
      type: String,
      default: ''
  },
  team: {
      type: String,
      default: ''
  },
  creationDate: { 
      type: Date, 
      default: Date.now()
 },
  accountType: { 
      type: Number,
      default: 0 //(Admin = 1, Normal = 0)
  }
});

UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

// UserSchema.methods.generateHash = function(password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// }

// UserSchema.methods.validPassword = function(password) {
//     return bcrypt.compareSync(password, this.password);
// }


module.exports = mongoose.model('Users', UserSchema);