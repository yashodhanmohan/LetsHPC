/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

import config from './config/environment';

import expressJwt from 'express-jwt';

let nullMiddleware = (req, res, next) => {
    next();
}

const authenticate = config.authenticate?expressJwt({secret: config.secrets.session}):nullMiddleware;

export default function(app) {
    // Insert routes below
    app.use('/api/approach', authenticate, require('./api/approach'));
    app.use('/api/category', authenticate, require('./api/category'));
    app.use('/api/machine', authenticate, require('./api/machine'));
    app.use('/api/number', authenticate, require('./api/number'));
    app.use('/api/penv', authenticate, require('./api/penv'));
    app.use('/api/perf', authenticate, require('./api/perf'));
    app.use('/api/problem', authenticate, require('./api/problem'));
    app.use('/api/user', authenticate, require('./api/user'));
    app.use('/auth', require('./auth').default);

    // All undefined asset or api routes should return a 404
    app.route('/:url(api|auth|components|app|bower_components|assets)/*')
        .get(errors[404]);

    // All other routes should redirect to the index.html
    app.route('/*')
        .get((req, res) => {
            res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
        });
}
