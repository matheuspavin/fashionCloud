const router = require('express').Router();
const cacheService = require('../services/cacheService');

router.get('/', async (req, res) => {
    const result = await cacheService.getAll();
    return res.json(result);
});

router.get('/:key', async (req, res) => {
    const key = req.params.key;
    const result = await cacheService.getCache(key);
    return res.json(result);
});

router.post('/:key', async (req, res, next) => {
    const key = req.params.key;
    const body = req.body;
    const result = await cacheService.insertCache(key, body);
    return res.send(result);
});

router.delete('/', async (req, res, next) => {
    const result = await cacheService.deleteAll();
    return res.send(result);
});

router.delete('/:key', async (req, res, next) => {
    const key = req.params.key;
    const result = await cacheService.deleteCache(key);
    return res.send(result);
});


module.exports = router;