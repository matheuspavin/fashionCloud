const router = require('express').Router();
const cacheService = require('../services/cacheService');

router.get('/', async (req, res) => {
    // console.log("aqui");
    const add = await cacheService.insert();
    // const result = await cacheService.getAll();
    return res.json(add);
});

// router.get('/brands/models', async function (req, res, next) {
//     const type = req.query.type;
//     const brand = req.query.brand;
//     const result = await vehiclesService.getCars(type, brand);
//     return res.json(result);
// });


module.exports = router;