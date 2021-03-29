const mongoose = require('./connection');
const Recipes = require('../models/Recipes');
const Data = require('./seeds.json');

Recipes.deleteMany({})
	.then(() => Recipes.insertMany(Data))
	.catch(console.error)
	.finally(() => {
		process.exit;
	});
