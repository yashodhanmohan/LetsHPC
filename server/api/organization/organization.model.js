'use strict';

import mongoose from 'mongoose';

var OrganizationSchema = new mongoose.Schema({
    name: String,
    country: String
});

export default mongoose.model('Organization', OrganizationSchema, 'organizations');
