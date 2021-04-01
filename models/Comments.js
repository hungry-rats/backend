const mongoose = require('../db/connection')
// const Users = require('./Users').Users

const Comments = new mongoose.Schema({
	post:String,
	timeOfPost: { type: Date, default: Date.now },
	author: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
	},
});

const CommentsModel = mongoose.model('Comments', Comments)

module.exports = {CommentsModel,Comments}