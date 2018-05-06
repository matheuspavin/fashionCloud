var config = {};

config.mongo = {}
config.mongo.url = 'mongodb://127.0.0.1:27017';
config.mongo.db = 'cache';
config.mongo.collection = process.env.TEST_COLLECTION || 'cache';

module.exports = config;