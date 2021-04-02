const mongoose = require('../db/connection');
const Comment = require('./Comments').Comments

const Recipes = new mongoose.Schema({
	title: String,
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	inspiredBy: String,
	allergies: [String],
	likes: Number,
	image: String,
	comments: [Comment],
	ingredients: [String],
	directions: [String],
	
});

const RecipeModel = mongoose.model('Recipes', Recipes);

module.exports = RecipeModel;
