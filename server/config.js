'use strict';
var fs = require('fs'),
	pkg = require('../package.json');

// Heroku uses a .env file but you need to use foreman to use it by default
// this is annoying because it does not detect changes and restart on change
// so import and parse the .env file so we can use nodemon
var devEnv,
	devEnvPath = '.env';

function parseDevEnv (env) {
	var envLines = env.split('\n'),
		devEnvMap = {};

	envLines.forEach(function (lineItem) {
		var items = lineItem.split('=');
		devEnvMap[items[0]] = items[1];
	});

	return devEnvMap;
}

if (fs.existsSync(devEnvPath)) {
	devEnv = fs.readFileSync(devEnvPath, 'utf-8');
	devEnv = parseDevEnv(devEnv);
}

// Express config
exports.PORT = process.env.PORT || 5000;

// Application constants
exports.VERSION = pkg.version;

// Search API request config
var CAPI_KEY = process.env.CAPI_KEY || devEnv.CAPI_KEY;
exports.CAPI_KEY = CAPI_KEY;
exports.SEARCH_QUERY = "lastPublishDateTime:>"; // To restrict to just news items: "genre:=\"News\" AND lastPublishDateTime:>"
exports.MAX_RESULTS = 100;
exports.capiSearchPath = 'http://api.ft.com/content/search/v1?apiKey=' + CAPI_KEY;
exports.listsPath = 'http://api.ft.com/lists/'

// My alerts config
exports.MY_ALERTS_CACHE_LENGTH = 5000;
