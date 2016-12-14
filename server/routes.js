/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {
    // Insert routes below
    app.use('/api/users', require('./api/user'));
    app.use('/api/apmaps', require('./api/apmap'));
    app.use('/api/categorys', require('./api/category'));
    app.use('/api/numbers', require('./api/number'));
    app.use('/api/problems', require('./api/problem'));
    app.use('/api/cpmaps', require('./api/cpmap'));
    app.use('/api/machines', require('./api/machine'));
    app.use('/api/explanations', require('./api/explanation'));
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
