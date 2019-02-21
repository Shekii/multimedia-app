const express = require('express');
const router = express.Router();

const File = require('../models/File');
const ObjectId = require('mongodb').ObjectID;

const session = require('express-session');

/*
 * Retrieve files, based on the Location of the user
 */
router.get('/', function(req, res) {

    File.find({}, (err, files ) => {
      if (err) {
        res.send({
          success: false,
          message: err
        });
      } else { 
        res.send({
          files: files
        });
      }
    });
});

/*
 * Update a file by id
 * 
 */
router.post('/delete/:id', function(req, res) {

  File.remove({
    _id: ObjectId(req.params.id)
  }, function(err) {
    if (err) 
          res.send( {
          success: false,
          error: 'Error: Error removing file'
        });
     else 
          res.send({
            success: true,
            message: 'Success, file deleted'
          })
  });
});
/*
 * Update a file and add a revision
 * 
 */
router.post('/update/:id', function(req, res) {
    const { body } = req;

    let updatedFile = body;

  if (!body.title || !body.description || !body.type 
      || !body.permittedLocations || !body.size  ) {
          res.send( {
          success: false,
          message: 'Error: Missing fields. Enter all of the fields.'
        });
    } else {

    File.findOne({
      _id: ObjectId(req.params.id)
    }, function(err, file) {
      if (err)
        res.send({
          success: false,
          message: err});
      else if (!file) {
        res.send({
          success: false,
          message: 'Failed. File not found.'});
      } else {
          updatedFile.modifiedBy =body.modifiedBy;
          updatedFile.dateModified = Date.now();
          file.fileVersions.push(updatedFile);

          file.save((err) => {
          if (err) {
            console.log(err);
            res.send( {
              success: false,
              message: err
            });
          } else {
            res.send( {
              success: true,
              message: 'Successful created new revision of the file.'
            });
          }
        });
      }
    });
    }
});

/*
 * Retrieve file from ID
 * 
 */
router.get('/:id', function(req, res) {

    File.findOne({
      _id: ObjectId(req.params.id)
    }, function(err, file) {
      if (err) 
        res.send({
          success: false,
          error: err});
      else if (!file) {
        res.send({
          success: false,
          error: 'File not found.'});
      } else {
        res.send({
          success: true,
          file: file});
      }

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
