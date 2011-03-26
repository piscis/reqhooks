var reqhook = {};

// Mounting the filter
// @todo automount it!
reqhook.filter = require('./lib/filter');
reqhook.redirect = require('./lib/redirect');
reqhook.header = require('./lib/header');

exports = module.exports = reqhook;
