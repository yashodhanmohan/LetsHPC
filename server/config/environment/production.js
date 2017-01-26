'use strict';
/*eslint no-process-env:0*/

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip: process.env.ip
   || '0.0.0.0',

  // Server port
  port: process.env.PORT
    || 9000,

  // MongoDB connection options
  mongo: {
    uri: process.env.MONGODB_URI
      || process.env.MONGOHQ_URL
      || process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME
      || 'mongodb://localhost/yashwantproject'
  },

  // Seed database on startup
  seedDB: false
};
