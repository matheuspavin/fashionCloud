const expect = require('chai').expect
const cacheService = require('../services/cacheService');

describe('Cache tests',  function () {
    describe.only('Get cache tests',  function () {
        it('Should try to get a non-existent cache and create ', async function () {
            let newCache = { 
                key: 'Test key'
            }
            let cache = await cacheService.getCache(newCache.key, 'testCache');
            let caches = await cacheService.getAll('testCache');
            expect(cache.key).to.be.equal(newCache.key);
            expect(caches.length).to.be.equal(1);
        });

        it('Should get a existent cache and only return their data', async function () {
            let newCache = { 
                key: 'Test key'
            }
            await cacheService.insertCache(newCache.key, 'testCache');
            let cache = await cacheService.getCache(newCache.key, 'testCache');
            let caches = await cacheService.getAll('testCache');
            expect(cache.key).to.be.equal(newCache.key);
            expect(caches.length).to.be.equal(1);
        });
    });

    describe('Create and update cache tests',  function () {

        it('Create a new cache ', async function () {
            let newCache = { 
                key: 'Test key'
            }
            let cache = await cacheService.insertCache(newCache.key, 'testCache');
            let caches = await cacheService.getAll('testCache');
            expect(cache.key).to.be.equal(newCache.key);
            expect(caches.length).to.be.equal(1);
        });

        it('Update a cache ', async function () {
            let newCache = { 
                key: 'Test key'
            }
            let cache = await cacheService.insertCache(newCache.key, 'testCache');
            expect(cache.key).to.be.equal(newCache.key);
        });
    });

    afterEach(async function () {
        await cacheService.deleteAll('testCache');
    });
});