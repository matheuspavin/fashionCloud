const databaseService = require('../infra/database');

const defaultCollection = 'cache';

const getAll = async function (collection = defaultCollection) {
    return await databaseService.getAll(collection);
};

const getCache = async function (key, collection = defaultCollection) {
    return await recoverCacheRules(key, collection);
};

const insertCache = async function (key, collection = defaultCollection) {
    const cache = createNewCache(key);
    return await databaseService.insert(collection, cache);
};

const updateCache = async function (cache, collection = defaultCollection) {
    return await databaseService.updateCache(collection, cache);
};

const deleteAll = async function (collection = defaultCollection) {
    return await databaseService.deleteAll(collection);
};


const recoverCacheRules = async function (key, collection) {
    const cache = await databaseService.getCache(collection, key);
    if (cache) {
        console.log('Cache hit');
        return cache;
    } else {
        console.log('Cache miss')
        return await insertCache(key, collection);
    }
};

const createNewCache = function (key) {
    return cache = {
        key: key,
        date: new Date(),
        hash: Math.random().toString(36).substr(1,16)
    }
}


module.exports = {
    getAll,
    getCache,
    insertCache,
    updateCache,
    deleteAll
};