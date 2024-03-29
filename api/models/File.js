const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  title: {
      type: String,
      required: true
  },
  createdBy: {
      type: String,
      required: true,
      ref: 'User'
  },
  dateCreated: {
      type: Date,
      default: Date.now()
  },
  type: {
      type: String,
      required: true,
  },
  size: {
      type: String,
      default: '1kb'
  },
  description: { 
      type: String,
      default: ''
  },
  //User can set which locations
  //may use view or edit the file
  permittedLocations: {
    type: [],
    required: true,
    default: []
  },
  //Version control
    fileVersions: [{
        title: {
            type: String,
            required: true
        },
        modifiedBy: {
            type: String,
            required: true,
            ref: 'User'
        },
        dateModified: {
            type: Date,
            default: Date.now()
        },
        type: {
            type: String,
            required: true,
        },
        size: {
            type: String,
            default: '1kb'
        },
        description: { 
            type: String,
            default: ''
        },
        permittedLocations: {
            type: [],
            required: true,
            default: []
        }
    }]

});

module.exports = mongoose.model('File', FileSchema);