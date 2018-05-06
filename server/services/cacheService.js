const databaseService = require('../infra/database');

const defaultCollection = 'cache';

const getAll = async function () {
    const all = await databaseService.getAll();
    return all;
};

const getCache = function (key) {
    return recoverCacheRules(key);
};

const insertCache = async function (key, body) {
    const cache = createNewCache(key, body);
    const validate = await validateCache(cache);
    await validateCacheEntries();
    return databaseService.updateCache(cache);
};

const updateCache = function (cache) {
    return databaseService.updateCache(cache);
};

const deleteAll = function () {
    return databaseService.deleteAll();
};

const deleteCache = function (key) {
    return databaseService.deleteCache(key);
};

const recoverCacheRules = async function (key) {
    const cache = await databaseService.getCache(key);
    if (cache) {
        console.log('Cache hit');
        if (validateTtl(cache)) {
            return insertCache(key, createNewCache(key));
        }
        return cache;
    } else {
        console.log('Cache miss')
        return insertCache(key, createNewCache(key));
    }
};

const createNewCache = function (key, body = {}) {
    return {
        key: key,
        date: new Date(),
        ttl: body.ttl || 5,
        data: body.data || Math.random().toString(36).substr(2, 32)
    }
};

const validateCache = async function (cache) {
    const validate = await databaseService.getCache(cache.key);
    return validate || {};
};

const validateTtl = async function (cache) {
    const diff = new Date().getTime() - new Date(cache.date).getTime();
    return (Math.abs(diff / 1000) < cache.ttl);
};

// I always remove the cache with the oldest date, since all the oldest is probably less used. 
// In a real process, some other checks are needed, but in this controlled scenario, 
// it's the most elegant way.
const validateCacheEntries = async function () {
    const caches = await getAll();
    if (caches.length >= 5) {
        const oldest = await databaseService.getOldest();
        await databaseService.deleteCache(oldest.key);
    }
};

module.exports = {
    getAll,
    getCache,
    insertCache,
    updateCache,
    deleteAll,
    deleteCache
};