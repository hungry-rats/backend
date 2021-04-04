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
	ingredients: { type: [String], default: 'null' },
	directions: { type: [String], default: 'null' },
});

const RecipeModel = mongoose.model('Recipe', Recipes);

module.exports = RecipeModel;
