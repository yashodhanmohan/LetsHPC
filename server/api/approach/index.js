'use strict';

let express = require('express');
let controller = require('./approach.controller');

let router = express.Router();

router.get('/', controller.index);
router.get('/:id/numbers', controller.numbersByApproach);
router.get('/:id/perfs', controller.perfsByApproach);
router.get('/:id/problem', controller.problemByApproach);
router.get('/:id/categories', controller.categoriesByApproach);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.upsert);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);

module.exports = router;
