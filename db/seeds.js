const mongoose = require('./connection');
const Recipes = require('../models/Recipes');
const Data = require('./oldSeeds.json');

const Comment = require('../models/Comments').CommentsModel;
const commentData = require('./commentSeed.json')

const Users = require('../models/Users').UsersModel
const TestData = require('./TestData.json')


Recipes.deleteMany({})
	.then(() => Recipes.insertMany(Data))
	.catch(console.error)
	.finally(() => {
	process.exit;
	});

// Users.deleteMany({})
// 		.then(() => Users.insertMany(Data))
// 		.catch(console.error)
// 		.finally(() => {
// 		process.exit;
// 	});

// Comment.deleteMany({})
// 	.then(() => Comment.insertMany(commentData))
// 	.catch(console.error)
// 	.finally(() => {
// 		process.exit;
// 	});
