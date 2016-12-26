/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/Approaches              ->  index
 * POST    /api/Approaches              ->  create
 * GET     /api/Approaches/:id          ->  show
 * PUT     /api/Approaches/:id          ->  upsert
 * PATCH   /api/Approaches/:id          ->  patch
 * DELETE  /api/Approaches/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Approach from './approach.model';

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

// Gets a list of Approaches
export function index(req, res) {
    return Approach.find().exec()
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Gets a single Approach from the DB
export function show(req, res) {
    return Approach.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Creates a new Approach in the DB
export function create(req, res) {
    return Approach.create(req.body)
        .then(respondWithResult(res, 201))
        .catch(handleError(res));
}

// Upserts the given Approach in the DB at the specified ID
export function upsert(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    return Approach.findOneAndUpdate({ _id: req.params.id }, req.body, { upsert: true, setDefaultsOnInsert: true, runValidators: true }).exec()

    .then(respondWithResult(res))
        .catch(handleError(res));
}

// Updates an existing Approach in the DB
export function patch(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    return Approach.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(patchUpdates(req.body))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Deletes a Approach from the DB
export function destroy(req, res) {
    return Approach.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
}
