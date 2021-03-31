const mongoose = require('../db/connection')
// const Users = require('./Users').schema

const Comments = new mongoose.Schema({
    post: String,
    // timeOfPost: String/* new Date().toString() */,
    // author: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // }
})

const CommentsModel = mongoose.model('Comments', Comments)

module.exports = {CommentsModel,Comments}