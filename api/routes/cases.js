var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer();

var dal = require('../dal/dal'); 

var dal_discovery = require('../dal/discovery_dal');

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

const url = 'mongodb://localhost:27017';
const dbName = 'database';
const client = new MongoClient(url);

//Retrieve all of the cases from the Discovery collection
router.get('/cases_discovery', function(req, res, next) {

    dal_discovery.getAllCasesFromCollection(req, res, function(stat, err, data) {

        if (err != null) {
            return res.json({ success: true, data: data });
        } else {
            return res.json({ success: false });
           
        }
    });
}); 

//View case 
router.get('/cases_discovery/case/(:id)', upload.array(), function(req, res) {

    dal_discovery.getCaseFromCollection(req, res, function(stat, err, data) {

        if (err != null) {
            console.log(data);
            //console.log(data.caseName);
            return res.json({ success: true, data: data });
        } else {
            return res.json({ success: false });
           
        }
    });
});


//Insert new case into discovery collection
router.post('/cases_discovery/', upload.array(), function (req, res) {

    console.log("adding case into discovery");
    let nu = { 
        caseName: req.body.caseName, 
        caseDate: req.body.caseDate, 
        text: req.body.text, 
     };

    dal_discovery.insertCaseIntoCollection(nu, req, res, function(stat, err) {
        if (err == null) {
            return res.json({ success:true });
        } else {
            console.log("ERROR:" + err);
            return res.json({ success:false, error:err });
        }
    });
});

//Delete case from collection
router.get('/cases_discovery/(:id)/delete', function(req, res) {

    dal_discovery.deleteCaseFromCollection(req, res, function(stat, err) {
        if (err == null) {
            return res.json({ success: true });  
        }
        else {
            console.log(err);
            return res.json({ success: false, error: err});              
        }
    });
});

//Edit case Discovery
router.post('/cases_discovery/:id/edit', upload.array(), function(req, res) {
    let nu = { 
        id: req.body.id,
        caseName: req.body.caseName, 
        caseDate: req.body.caseDate, 
        text: req.body.text, 
    };

    dal_discovery.editCaseInCollection(nu, req, res, function(stat, err) {

       if (err == null)
        {
          return res.json({ success: true});
        } 
        else {
          return res.json({ success: false, error: err});
        }
    });
});


//Add new case
router.post('/cases/', upload.array(), function (req, res) {

    console.log("adding case");
    let nu = { 
        caseName: req.body.caseName, 
        caseDate: req.body.caseDate, 
        text: req.body.text, 
     };

    dal.addNewCase(nu, req, res, function(stat, err) {
        if (err == null) {
            return res.json({ success:true });
        } else {
            return res.json({ success:false, error:err });
        }
    });
});


//Edit case
router.post('/cases/:id/edit', upload.array(), function(req, res) {
    let nu = { 
        id: req.body.id,
        caseName: req.body.caseName, 
        caseDate: req.body.caseDate, 
        text: req.body.text, 
    };

    dal.updateCaseById(nu, req, res, function(stat, err) {

       if (err == null)
        {
          return res.json({ success: true});
        } 
        else {
          return res.json({ success: false, error: err});
        }
    });
});


//Delete pet
router.get('/cases/(:id)/delete', function(req, res) {

    dal.deleteById(req, res, function(stat, err) {
        if (err == null) {
            return res.json({ success: true });  
        }
        else {
            return res.json({ success: false, error: err});              
        }
    });

});


module.exports = router;
