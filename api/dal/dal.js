// database connection configuration
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

const url = 'mongodb://localhost:27017';
const dbName = 'database';
const client = new MongoClient(url); 

module.exports = {

    getAllCases: function (req, res, next) {
        client.connect(function (err) {
            const db = client.db(dbName);
            const collection = db.collection('cases');

            collection.find({}).toArray(function (err, data) {
                if (err != null) {
                    console.log(err);
                    next(false, err, []);
                }
                next(true, [], data);
            });
        });
    },

    getCaseById: function (req, res, next) {
        client.connect(function (err) {
            const db = client.db(dbName);
            const collection = db.collection('animals');

            collection.find({ _id: ObjectId(req.params.id) }).toArray(function (err, data) {
                if (err != null) {
                    console.log(err);
                    next(false, err, []);
                }
                next(true, [], data);
            });
        });
    },

    addNewCase: function (nu, req, res, next) {
        client.connect(function (err) {
            const db = client.db(dbName);
            const collection = db.collection('cases');

            collection.insertOne(nu, function (err, result) {
                if (err != null) {
                    console.log(err);
                    console.log(err);
                    next(false, err, []);
                }
                next(true, []);
            });
        });
    }, 

    updateCaseById: function (nu, req, res, next) {
        client.connect(function (err) {
            const db = client.db(dbName);
            const collection = db.collection('cases');

            collection.updateOne(
                { _id: ObjectId(nu.id) },
                { $set: { caseName: nu.caseName, caseDate: nu.caseDate, caseText: nu.caseText } },
                function (err, result) {
                    if (err != null) {
                        console.log(err);
                        next(false, err, []);
                    }
                    next(true, []);
                });
        });
    },

    deleteById: function (req, res, next) {
        try {
            client.connect(function (err) {
                const db = client.db(dbName);
                const collection = db.collection('cases');

                collection.deleteOne({ _id: ObjectId(req.params.id) }, function (err, result) {
                    if (err != null) {
                        console.log(err);
                        next(false, err, []);
                    }
                    next(true, []);
                });
            });
        } catch (err) {
            console.log(err);
        }
    }

}