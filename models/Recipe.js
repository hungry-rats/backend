const mongoose = require('../db/connection');

const Recipe = new mongoose.Schema({
	test: String,
});

const RecipeModel = mongoose.model('Test', Test);

module.exports = RecipeModel;