const express = require('express');
const router = express.Router();

const File = require('../models/File');

/*
 * Retrieve files
 */
router.get('/', function(req, res) {

    File.find({}, (err, files ) => {

      res.send({files: files});

      console.log(files);
    });
});

/*
 * Upload File
 */
router.post('/upload', function(req, res) {
    const { body } = req;
    const {
        title,
        description,
        type,
        size,
        permittedLocations,
        createdBy
    } = body;


  if (!title || !description || !type || !size 
      || !permittedLocations ) {
          res.send( {
          success: false,
          message: 'Error: Missing fields. Enter all of the fields.'
        });
    } else { 
    const newFile = new File(body);
    // save the user
    
      newFile.save((err) => {
      if (err) {
        console.log(err);
        res.send( {
          success: false,
          message: 'Upload Failed.'
        });
      } else {
        res.send( {
          success: true,
          message: 'Successful uploaded new file.'
        });
      }
    });
  }
});

module.exports = router; 
