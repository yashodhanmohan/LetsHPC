'use strict';

let express = require('express');
let controller = require('./perf.controller');

let router = express.Router();

router.get('/:id/problem', controller.problemByPerf);
router.get('/:id/approach', controller.approachByPerf);
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.upsert);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);

module.exports = router;