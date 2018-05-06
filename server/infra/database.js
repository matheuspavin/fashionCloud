dbConnection = require('./databaseConnection');

const mainDb = async function () {
    const client = await dbConnection.clientConnection();
    return await client.collection('cache');
};

const insert = async function () {
    const cacheCollection = await mainDb();
    try {
        cacheCollection.insert({name: "testCache", description: "testing the insert of the cache"}, function(err, result) {
            console.log("entry saved");
            return;
        });
    } catch (err) {
        console.log(err);
    }
};

const getAll = async function () {
    const cacheCollection = await mainDb();
    const cursor = cacheCollection.find();
        cursor.each(function(err, doc) {
            if(err)
                throw err;
            if(doc==null)
                return;
        
            console.log("document find:");
            console.log(JSON.stringify(doc));
    });
};

module.exports = {
    // db,
    insert,
    getAll
}