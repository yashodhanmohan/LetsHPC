'use strict';

import express from 'express';
import passport from 'passport';
import {signToken} from '../auth.service';
import _ from 'lodash';

var router = express.Router();

router.post('/', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        let error = err || info;
        if (error) {
            console.log(error);
            return res.status(401).jsonp({error, info});
        }
        if (!user) {
            return res.status(404).jsonp({message: 'Something went wrong, please try again.'});
        }
        let token = signToken(user._id, user.role);
        res.json({ token , user});
    })(req, res, next);
});

export default router;
