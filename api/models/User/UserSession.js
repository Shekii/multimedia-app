const mongoose = require('mongoose');

const UserSessionSchema= new mongoose.Schema({
  userId: {
      type: String,
      default: -1
  },
  timestamp: {
      type: Date,
      default: Date.now()
  }
});


module.exports = mongoose.model('UserSessions', UserSessionSchema);