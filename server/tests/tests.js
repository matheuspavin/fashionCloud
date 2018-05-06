const expect = require('chai').expect
const cacheService = require('../services/cacheService');

describe('Cache tests',  function () {
    describe('Get cache tests',  function () {
        it('Should try to get a non-existent cache and create ', async function () {
            let newCache = { 
                key: 'Test key'
            }
            let cache = await cacheService.getCache(newCache.key);
            let caches = await cacheService.getAll();
            expect(cache.key).to.be.equal(newCache.key);
            expect(caches.length).to.be.equal(1);
        });

        it('Should get a existent cache and only return their data', async function () {
            let newCache = { 
                key: 'Test key'
            }
            await cacheService.insertCache(newCache.key);
            let cache = await cacheService.getCache(newCache.key);
            let caches = await cacheService.getAll();
            expect(cache.key).to.be.equal(newCache.key);
            expect(caches.length).to.be.equal(1);
        });

        it('Should get all caches stored', async function () {
            let keys = [
                { key: 'Test 1'},
                { key: 'Test 2'},
                { key: 'Test 3'},
                { key: 'Test 4'},
                { key: 'Test 5'}
            ]
            for (key of keys) {
                await cacheService.insertCache(key.key, {});
            }
            let caches = await cacheService.getAll();
            expect(caches.length).to.be.equal(5);
        });

    });

    describe('Create and update cache tests',  function () {

        it('Create a new cache ', async function () {
            let newCache = { 
                key: 'Test key'
            }
            let cache = await cacheService.insertCache(newCache.key, {});
            let caches = await cacheService.getAll();
            expect(cache.key).to.be.equal(newCache.key);
            expect(caches.length).to.be.equal(1);
        });

        it('Update a cache ', async function () {
            let newCache = { 
                key: 'Test key'
            }
            let cache = await cacheService.insertCache(newCache.key);
            expect(cache.key).to.be.equal(newCache.key);
        });
    });

    describe('Remove cache tests',  function () {
        it('Should remove a specific cache from the database', async function () {
            let newCache = { 
                key: 'Test key'
            }
            let cache = await cacheService.insertCache(newCache.key, {});
            await cacheService.deleteCache(cache.key);
            let caches = await cacheService.getAll();
            expect(caches.length).to.be.equal(0);
            expect(cache.key).to.be.equal(newCache.key);
        });

        it('Should delete all caches stored', async function () {
            let keys = [
                { key: 'Test 1'},
                { key: 'Test 2'},
                { key: 'Test 3'},
                { key: 'Test 4'},
                { key: 'Test 5'}
            ]
            for (key of keys) {
                await cacheService.insertCache(key.key);
            }
            let caches = await cacheService.getAll();
            expect(caches.length).to.be.equal(5);
            await cacheService.deleteAll();
            let deletedCaches = cacheService.getAll();
            expect(deletedCaches.length).to.be.equal(undefined);
        });
    });

    afterEach(async function () {
        await cacheService.deleteAll();
    });
});