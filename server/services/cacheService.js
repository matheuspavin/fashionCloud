const databaseService = require('../infra/database');

const getAll = async function () {
    return await databaseService.getAll('cache');
};

const getCache = async function (key) {
    return await databaseService.getCache('cache', key);
};

const insertCache = async function (key) {
    const cache = {
        key: key,
        date: new Date(),
        hash: Math.random().toString(36).substr(1,16)
    }
    return await databaseService.insert('cache', cache);
};

const updateCache = async function (cache) {
    return await databaseService.updateCache('cache', cache);
};

const deleteAll = async function () {
    return await databaseService.deleteAll('cache');
};


module.exports = {
    getAll,
    getCache,
    insertCache,
    updateCache,
    deleteAll
};