const mongoose = require('../db/connection');

const Recipe = new mongoose.Schema({
	test: String,
});

const RecipeModel = mongoose.model('Recipe', Recipe);

module.exports = RecipeModel;
