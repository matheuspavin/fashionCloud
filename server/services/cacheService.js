const databaseService = require('../infra/database');

const defaultCollection = 'cache';

const getAll = async function (collection = defaultCollection) {
    return await databaseService.getAll(collection);
};

const getCache = async function (key, collection = defaultCollection) {
    return await databaseService.getCache(collection, key);
};

const insertCache = async function (key, collection = defaultCollection) {
    const cache = {
        key: key,
        date: new Date(),
        hash: Math.random().toString(36).substr(1,16)
    }
    return await databaseService.insert(collection, cache);
};

const updateCache = async function (cache, collection = defaultCollection) {
    return await databaseService.updateCache(collection, cache);
};

const deleteAll = async function (collection = defaultCollection) {
    return await databaseService.deleteAll(collection);
};


module.exports = {
    getAll,
    getCache,
    insertCache,
    updateCache,
    deleteAll
};