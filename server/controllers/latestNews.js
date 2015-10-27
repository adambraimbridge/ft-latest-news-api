'use strict';
var config = require('../config.js'),
	latestNewsViewModel = require('../models/latestNewsViewModel.js');

module.exports = function (req, res) {
	var data = {
		version: config.VERSION,
		title: 'The lastest news from the FT',
		req: req
	};

	var latestNews = latestNewsViewModel.buildModel(data);
	res.header("Content-Type", "application/json; charset=utf-8");
	res.json(latestNews.articles);
};