'use strict';

var express = require('express');
var controller = require('./explanation.controller');

var router = express.Router();
router.get('/getExplanation', controller.returnAllRows);
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.upsert);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);

module.exports = router;
