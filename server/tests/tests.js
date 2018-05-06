const expect = require('chai').expect
const cacheService = require('../services/cacheService');

describe('Create and update cache tests',  function () {
    
    it('Create a new cache ', async function () {
        let cache = { 
               key: 'Test key'
        }
        let cacheInserted = await cacheService.insertCache(cache.key, 'testCache');
        expect(cacheInserted.key).to.be.equal(cache.key);
    });

    afterEach(async function () {
        await cacheService.deleteAll('testCache');
    });
});