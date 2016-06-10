var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    mobile_expires: Math.floor(5000), //5secs hardwired for unit test/ Works too for integration test
    root: rootPath,
    app: {
      name: 'trace'
    },
    port: 3000,
    db: 'mongodb://localhost:27017/logical_address'
  },

  test: {
    mobile_expires: Math.floor(24 * 60 * 60 * 1000), //24hours in milliseconds
    root: rootPath,
    app: {
      name: 'trace'
    },
    port: 3000,
    db: process.env.TEST_DB_CONNECTION || 'mongodb://localhost:27017/logical_address'
  },

  production: {
    mobile_expires: Math.floor(24 * 60 * 60 * 1000), //24hours in milliseconds
    root: rootPath,
    app: {
      name: 'trace'
    },
    port: 3000,
    db: process.env.PRODUCTION_DB_CONNECTION
  }
};

config[env].special_users = ['logicaladdress','retnan','daser','lasociale'];

module.exports = config[env];