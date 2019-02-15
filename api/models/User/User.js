const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
mongoose.connect('mongodb://localhost:27017/TMS', {useNewUrlParser: true});
const UserSchema = new mongoose.Schema({
  username: {
      type: String,
      default: ''
  },
  password: {
      type: String,
      default: ''
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
  },
   isDeleted: {
        type:Boolean,
        default: false
    }
});

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}
module.exports = mongoose.model('Users', UserSchema);