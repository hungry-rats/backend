const mongoose = require('../db/connection');
const Comment = require('./Comments').Comments

const Recipes = new mongoose.Schema({
	title: String,
	author: String,
	inspiredBy: String,
	allergies: [String],
	likes: Number,
	image: String,
	comments:[Comment],
	information: [
		{
			name: String,
			ingredients: [String],
			directions: [String],
		},
	],
});

const RecipeModel = mongoose.model('Recipes', Recipes);

module.exports = RecipeModel;
