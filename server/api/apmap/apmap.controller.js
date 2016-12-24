/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/Apmaps              ->  index
 * POST    /api/Apmaps              ->  create
 * GET     /api/Apmaps/:id          ->  show
 * PUT     /api/Apmaps/:id          ->  upsert
 * PATCH   /api/Apmaps/:id          ->  patch
 * DELETE  /api/Apmaps/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Apmap from './apmap.model';

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

// Gets a list of Apmaps
export function index(req, res) {
    return Apmap.find().exec()
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Gets a single Apmap from the DB
export function show(req, res) {
    return Apmap.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Creates a new Apmap in the DB
export function create(req, res) {
    return Apmap.create(req.body)
        .then(respondWithResult(res, 201))
        .catch(handleError(res));
}

// Upserts the given Apmap in the DB at the specified ID
export function upsert(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    return Apmap.findOneAndUpdate({ _id: req.params.id }, req.body, { upsert: true, setDefaultsOnInsert: true, runValidators: true }).exec()

    .then(respondWithResult(res))
        .catch(handleError(res));
}

// Updates an existing Apmap in the DB
export function patch(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    return Apmap.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(patchUpdates(req.body))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Deletes a Apmap from the DB
export function destroy(req, res) {
    return Apmap.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
}


export function getApproaches(req, res) {
    return Apmap.find({ apmap_problem_id: req.param.problem_id })
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));}
