const expect = require('chai').expect
const cacheService = require('../services/cacheService');

describe('Cache tests', function () {
    describe('Get cache tests', function () {
        it('Should try to get a non-existent cache and create ', async function () {
            const newCache = {
                key: 'Test key'
            }
            const cache = await cacheService.getCache(newCache.key);
            const caches = await cacheService.getAll();
            expect(cache.key).to.be.equal(newCache.key);
            expect(caches.length).to.be.equal(1);
        });

        it('Should get a existent cache and only return their data', async function () {
            const newCache = {
                key: 'Test key'
            }
            await cacheService.insertCache(newCache.key);
            const cache = await cacheService.getCache(newCache.key);
            const caches = await cacheService.getAll();
            expect(cache.key).to.be.equal(newCache.key);
            expect(caches.length).to.be.equal(1);
        });

        it('Should get all caches stored', async function () {
            const keys = [
                { key: 'Test 1' },
                { key: 'Test 2' },
                { key: 'Test 3' },
                { key: 'Test 4' },
                { key: 'Test 5' }
            ]
            for (key of keys) {
                await cacheService.insertCache(key.key, {});
            }
            const caches = await cacheService.getAll();
            expect(caches.length).to.be.equal(5);
        });

        it('Should try to get a expired ttl cache ', async function () {
            const newCache = {
                key: 'Test key',
                ttl: 1
            }
            const insertedCache = await cacheService.insertCache(newCache.key, newCache);
            await sleep(1500)
            const cache = await cacheService.getCache(newCache.key);
            expect(insertedCache.data).not.be.equal(cache.data);
        });

    });

    describe('Create and update cache tests', function () {

        it('Create a new cache ', async function () {
            const newCache = {
                key: 'Test key'
            }
            const cache = await cacheService.insertCache(newCache.key, {});
            const caches = await cacheService.getAll();
            expect(cache.key).to.be.equal(newCache.key);
            expect(caches.length).to.be.equal(1);
        });

        it('Update a cache ', async function () {
            const newCache = {
                key: 'Test key'
            }
            const cache = await cacheService.insertCache(newCache.key);
            expect(cache.key).to.be.equal(newCache.key);
        });

        it('Should create above the maximu quantity of caches', async function () {
            const keys = [
                { key: 'Test 1' },
                { key: 'Test 2' },
                { key: 'Test 3' },
                { key: 'Test 4' },
                { key: 'Test 5' },
                { key: 'Test 6' },
            ]
            for (key of keys) {
                await sleep(500);
                await cacheService.insertCache(key.key, {});
            }
            const caches = await cacheService.getAll();
            expect(caches.length).to.be.equal(5);
        });
    });

    describe('Remove cache tests', function () {
        it('Should remove a specific cache from the database', async function () {
            const newCache = {
                key: 'Test key'
            }
            const cache = await cacheService.insertCache(newCache.key, {});
            await cacheService.deleteCache(cache.key);
            const caches = await cacheService.getAll();
            expect(caches.length).to.be.equal(0);
            expect(cache.key).to.be.equal(newCache.key);
        });

        it('Should delete all caches stored', async function () {
            const keys = [
                { key: 'Test 1' },
                { key: 'Test 2' },
                { key: 'Test 3' },
                { key: 'Test 4' },
                { key: 'Test 5' }
            ]
            for (key of keys) {
                await cacheService.insertCache(key.key);
            }
            const caches = await cacheService.getAll();
            expect(caches.length).to.be.equal(5);
            await cacheService.deleteAll();
            const deletedCaches = cacheService.getAll();
            expect(deletedCaches.length).to.be.equal(undefined);
        });
    });

    afterEach(async function () {
        await cacheService.deleteAll();
    });

    after(function () {
        process.exit();
    });
});

const sleep = function (timeout) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve();
        }, timeout);
    });
};