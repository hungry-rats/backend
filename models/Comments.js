const mongoose = require('../db/connection');

const Comments = new mongoose.Schema({
	post: String,
	recipeId: String,
	timeOfPost: { type: Date, default: Date.now },
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
});

const CommentsModel = mongoose.model('Comments', Comments);

module.exports = { CommentsModel, Comments };
