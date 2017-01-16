/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/Numbers              ->  index
 * POST    /api/Numbers              ->  create
 * GET     /api/Numbers/:id          ->  show
 * PUT     /api/Numbers/:id          ->  upsert
 * PATCH   /api/Numbers/:id          ->  patch
 * DELETE  /api/Numbers/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Number from './number.model';

function respondWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function(entity) {
        if (entity) {
            return res.status(statusCode).json(entity);
        }
        return null;
    };
}

function patchUpdates(patches) {
    return function(entity) {
        try {
            jsonpatch.apply(entity, patches, /*validate*/ true);
        } catch (err) {
            return Promise.reject(err);
        }

        return entity.save();
    };
}

function removeEntity(res) {
    return function(entity) {
        if (entity) {
            return entity.remove()
                .then(() => {
                    res.status(204).end();
                });
        }
    };
}

function handleEntityNotFound(res) {
    return function(entity) {
        if (!entity) {
            res.status(404).end();
            return null;
        }
        return entity;
    };
}

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function(err) {
        res.status(statusCode).send(err);
    };
}

// Gets a list of Numbers
export function index(req, res) {
    return Number.find().exec()
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Gets a single Number from the DB
export function show(req, res) {
    return Number.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Creates a new Number in the DB
export function create(req, res) {
    return Number.create(req.body)
        .then(respondWithResult(res, 201))
        .catch(handleError(res));
}

// Upserts the given Number in the DB at the specified ID
export function upsert(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    return Number.findOneAndUpdate({ _id: req.params.id }, req.body, { upsert: true, setDefaultsOnInsert: true, runValidators: true }).exec()

    .then(respondWithResult(res))
        .catch(handleError(res));
}

// Updates an existing Number in the DB
export function patch(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    return Number.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(patchUpdates(req.body))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Deletes a Number from the DB
export function destroy(req, res) {
    return Number.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
}

export function returnAllRows(req, res) {
    return Number.find({ approach_id: req.param.approach_id })
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));

}

export function return_by_problem(req, res) {
    return Number.find({ problem_id: req.params.id})
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}
