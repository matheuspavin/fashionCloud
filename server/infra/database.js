dbConnection = require('./databaseConnection');

const mainDb = async function (collection) {
    const client = await dbConnection.clientConnection();
    return await client.collection(collection);
};


const getAll = async function (collection) {
    try {
        const cacheCollection = await mainDb(collection);
        const cursor = cacheCollection.find();
        let result = [];
        while(await cursor.hasNext()) {
            const doc = await cursor.next();
            result.push(doc);
        }
        return result;
    } catch (err) {
        throw(err);
    }
};

const getCache = async function (collection, key) {
    try {
        const cacheCollection = await mainDb(collection);
        const cursor = await cacheCollection.findOne({key: key});
        return cursor;
    } catch (err) {
        throw(err);
    }
}


const insert = async function (collection, insertObj) {
    const cacheCollection = await mainDb(collection);
    try {
        let response = await cacheCollection.insertOne(insertObj);
        return response.ops[0];
    } catch (err) {
        throw(err);
    }
};

const updateCache = async function (collection, cache) {
    const cacheCollection = await mainDb(collection);
    try {
        const cursor = await cacheCollection.updateOne({key: cache.key}, {$set: {key: cache.key, date: cache.date, data: cache.data, ttl: cache.ttl}}, {upsert: true});  
        return getCache(collection, cache.key);
    } catch (err) {
        throw(err);
    }
};

const deleteAll = async function (collection) {
    try {
        const cacheCollection = await mainDb(collection);
        const cursor = cacheCollection.deleteMany();
        return 'All cache deleted with sucess';
    } catch (err) {
        throw(err);
    }
};

const deleteCache = async function (collection, key) {
    try {
        const cacheCollection = await mainDb(collection);
        const cursor = await cacheCollection.deleteOne({key: key});
        return 'Cache deleted with sucess';
    } catch (err) {
        throw(err);
    }
};

module.exports = {
    getAll,
    getCache,
    insert,
    updateCache,
    deleteAll,
    deleteCache
};