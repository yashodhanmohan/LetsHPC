/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

require('./user.seed');
require('./category.seed');
require('./approach.seed');
require('./problem.seed');
require('./machine.seed');
require('./number.seed');

console.log('Seed database populated');