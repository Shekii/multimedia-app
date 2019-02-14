// database connection configuration
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

const url = 'mongodb://localhost:27017';
const dbName = 'database';
const client = new MongoClient(url); 

//Import Watson Developer Cloud SDK
const watson = require("watson-developer-cloud");

// Import service credentials
const serviceCredentials = require('./service-credentials.json');

// Create the Discovery object
var discovery = new watson.DiscoveryV1({
  url:serviceCredentials.discovery.url,
  iam_apikey:serviceCredentials.discovery.apikey,
  version:'2018-12-03'
  
});

var fs = require('fs');

var environmentId = serviceCredentials.discovery.environmentID;
var collectionId = serviceCredentials.discovery.collectionID;
var configurationId = serviceCredentials.discovery.configurationID;

module.exports = {

    getAllCasesFromCollection: function (req, res, next) {

        let queryString ="";

        queryDiscovery(queryString, function(err, queryResults) {

            if (err) {
                console.log(err);
                next(false, err, []);
            }

            queryResults = queryResults.results;

            next(true, [], queryResults);
        });
    },

    getCaseFromCollection: function (req, res, next) {

        let caseID = req.params.id;
        let queryString = "id::"+caseID; 

        //https://stackoverflow.com/questions/44624500/watson-discovery-example-using-query-options-in-node-js
        var params = {
            'query': queryString,
            'environment_id':environmentId,
            'collection_id': collectionId,
            'configuration_id': configurationId,
        //'passages': true, //if you want to enable passages
            return: 'caseName, caseDate, text, enriched_text'
        //'highlight': true //if you want to enable highlight

        }
        discovery.query(params, (error, results) => {
            if (error) {
                next(false, err, []);
            } else {
                console.log(results); //your query results
                next(true, [], results.results);
            }
        });
    },

    editCaseInCollection: function (nu, req, res, next) {

        let editFile = JSON.stringify(nu);
        discovery.updateJsonDocument({ 
            environment_id: environmentId,
            collection_id: collectionId, 
            document_id: req.params.id,
            file: nu
        }), 
        function(error, data) {
            if (error == null) {
                next(true, []);
            } else {
                next(false, error, []);
            }
        };
    },

    insertCaseIntoCollection: function (nu, req, res, next) {

            //addDocument() doesn't work unless a file is 
            //created on the server?
            // discovery.addDocument({ 

            //     environment_id: environmentId, 
            //     collection_id: collectionId,
            //     file: nu
            //    },

            //     function(error, data) {

            //         if (error != null) {
            //             next(false, error, []);
            //         }

            //         next (true, []);

            //     }
            // );
            let document_obj = {
                environment_id: environmentId,
                collection_id: collectionId,
                file: nu
            }
            discovery.addJsonDocument(document_obj, function (err, response) {
            if (err) {
                next(false, err, []);
            } else {
               next(true, []);
            }
            });
       
    },

    deleteCaseFromCollection: function (req, res,next) {
        
        discovery.deleteDocument({ 
            environment_id: environmentId,
            collection_id: collectionId, 
            document_id: req.params.id
        }), 
        function(error, data) {
            if (error == null) {
                next(true, []);
            } else {
                next(false, error, []);
            }
        };

    }
}

/*****************************
    Function Definitions
******************************/
function queryDiscovery(query, callback) {
  // Function to query Discovery

  discovery.query({
    environment_id: environmentId,
    collection_id: collectionId,
    aggregation: query
    }, function(err, response) {
       if (err) {
         console.error(err);
         callback(err, null);
       } else {
         //var results = JSON.stringify(response, null, 2);
        // console.log(results);
         callback(null, response);
       }
    });
}