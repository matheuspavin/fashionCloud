const router = require('express').Router();
const cacheService = require('../services/cacheService');

router.get('/', async (req, res) => {
    const result = await cacheService.getAll();
    return res.json(result);
});

router.get('/:key', async (req, res) => {
    var key = req.params.key;
    const result = await cacheService.getCache(key);
    return res.json(result);
});

router.post('/:key', async (req, res, next) => {
    var key = req.params.key;
    let result = await cacheService.insertCache(key);
    return res.send(result);
});

// Should use PATCH if i have time
router.put('/', async (req, res, next) => {
    var body = req.body;
    let result = await cacheService.updateCache(body);
    return res.send(result);
});

router.delete('/', async (req, res, next) => {
    let result = await cacheService.deleteAll();
    return res.send(result);
});


module.exports = router;