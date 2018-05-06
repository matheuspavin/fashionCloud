const databaseService = require('../infra/database');
// const ordersService = require('./ordersService');

// const getAll = async function () {
//     await integrateWithOrders();
//     const sql = `SELECT * FROM companies
//                  WHERE 
//                     active = 1`;
//     // return databaseService.query(sql, []);
// };

const insert = async function () {
    await databaseService.insert();
    await databaseService.getAll();
};


module.exports = {
    insert
};