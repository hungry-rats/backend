const express = require('express');
const { model } = require('mongoose');
const router = express.Router();

const Test = require('../models/Test');

router.get('/', (req, res, next) => {
	Test.find({})
		.then((test) => {
			res.json(test);
		})
		.catch(next);
});

module.exports = router;
