var reqhook = {};

// Mounting the filter
// @todo automount it!
reqhook.filter = require('./lib/filter');
reqhook.redirect = require('./lib/redirect');

exports = module.exports = reqhook;