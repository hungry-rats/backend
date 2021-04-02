const mongoose = require('./connection');
const Recipes = require('../models/Recipes');
const Data = require('./seeds.json');

const Users = require('../models/Users')
const TestData = require('./TestData.json')

Recipes.deleteMany({})
	.then(() => Recipes.insertMany(Data))
	.catch(console.error)
	.finally(() => {
	process.exit;
	});

// Users.deleteMany({})
// 		.then(() => Users.insertMany(TestData))
// 		.catch(console.error)
// 		.finally(() => {
// 		process.exit;
// 	});
