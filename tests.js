global.chai = require('chai');
global.chai.use(require('chai-as-promised'));
global.expect = chai.expect;

require('./server/tests/tests.js');