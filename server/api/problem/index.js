'use strict';

var express = require('express');
var controller = require('./problem.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id/approaches', controller.approachesByProblem);
router.get('/:id/numbers', controller.numbersByProblem);
router.get('/:id/categories', controller.categoriesByProblem);
router.get('/:id/machines', controller.machinesByProblem);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.upsert);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);

module.exports = router;
