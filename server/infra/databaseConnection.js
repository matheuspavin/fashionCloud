var MongoClient = require('mongodb').MongoClient;
 
exports.clientConnection = async function () {
    return new Promise( function (resolve, reject) {
        try {
            MongoClient.connect('mongodb://127.0.0.1:27017', async function(err, client) {
                var db = await client.db('cache');
                return resolve(db);
            });
        } catch (err) {
            throw(err);
        }
    });
};