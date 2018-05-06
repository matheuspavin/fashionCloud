dbConnection = require('./databaseConnection');

const defaultCollection = 'cache';

const mainDb = async function () {
    const client = await dbConnection.clientConnection();
    return await client.collection(defaultCollection);
};


const getAll = async function () {
    try {
        const cacheCollection = await mainDb();
        const cursor = await cacheCollection.find().toArray();
        const result = [];
        for(const cache of cursor){
            result.push({key: cache.key});
        }
        return result;
    } catch (err) {
        throw(err);
    }
};

const getCache = async function (key) {
    try {
        const cacheCollection = await mainDb();
        const cursor = await cacheCollection.findOne({key: key});
        return cursor;
    } catch (err) {
        throw(err);
    }
};

const getOldest = async function () {
    try {
        const cacheCollection = await mainDb();
        const cursor =  await cacheCollection.find().sort({date: 1}).limit(1).toArray();
        return cursor[0];
    } catch (err) {
        throw(err);
    }
}


const insert = async function (insertObj) {
    const cacheCollection = await mainDb();
    try {
        let response = await cacheCollection.insertOne(insertObj);
        return response.ops[0];
    } catch (err) {
        throw(err);
    }
};

const updateCache = async function (cache) {
    const cacheCollection = await mainDb();
    try {
        const cursor = await cacheCollection.updateOne({key: cache.key}, {$set: {key: cache.key, date: cache.date, data: cache.data, ttl: cache.ttl}}, {upsert: true});  
        return getCache(cache.key);
    } catch (err) {
        throw(err);
    }
};

const deleteAll = async function () {
    try {
        const cacheCollection = await mainDb();
        const cursor = cacheCollection.deleteMany();
        return 'All cache deleted with sucess';
    } catch (err) {
        throw(err);
    }
};

const deleteCache = async function (key) {
    try {
        const cacheCollection = await mainDb();
        const cursor = await cacheCollection.deleteOne({key: key});
        return 'Cache deleted with sucess';
    } catch (err) {
        throw(err);
    }
};

module.exports = {
    getAll,
    getCache,
    getOldest,
    insert,
    updateCache,
    deleteAll,
    deleteCache
};