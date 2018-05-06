const databaseService = require('../infra/database');

const defaultCollection = 'cache';

const getAll = async function (collection = defaultCollection) {
    const all = await databaseService.getAll(collection);
    return all;
};

const getCache = function (key, collection = defaultCollection) {
    return recoverCacheRules(key, collection);
};

const insertCache = async function (key, body, collection = defaultCollection) {
    const cache = createNewCache(key, body);
    const validate = await validateCache(cache, collection);
    return databaseService.updateCache(collection, cache);
};

const updateCache = function (cache, collection = defaultCollection) {
    return databaseService.updateCache(collection, cache);
};

const deleteAll = function (collection = defaultCollection) {
    return databaseService.deleteAll(collection);
};

const deleteCache = function (key, collection = defaultCollection){
    return databaseService.deleteCache(collection, key);
};

const recoverCacheRules = async function (key, collection) {
    const cache = await databaseService.getCache(collection, key);
    if (cache) {
        console.log('Cache hit');
        return cache;
    } else {
        console.log('Cache miss')
        return insertCache(key, createNewCache(key, {}), collection);
    }
};

const createNewCache = function (key, body) {
    return {
        key: key,
        date: new Date(),
        ttl: body.ttl || 1000,
        data: body.data || Math.random().toString(36).substr(2,32)
    }
};

const validateCache = async function (cache, collection) {
    const validate = await databaseService.getCache(cache.key, collection);
    return validate || {};
}


module.exports = {
    getAll,
    getCache,
    insertCache,
    updateCache,
    deleteAll,
    deleteCache
};