const express = require('express');
const router = express.Router();
const Comment = require('../models/Comments').CommentsModel;
const Recipe = require('../models/Recipes');
const mongoose = require('mongoose')
const toId = mongoose.Types.ObjectId


// GET all recipe comments
router.get('/:recipeId/comments', (req, res, next) => {
	Recipe.findById({ _id: req.params.recipeId }).then((recipe) =>
		res.json(recipe.comments)
	);

});

//POST creates comment on recipe
router.post('/:userId/:recipeId/comments/create', (req, res, next) => {
	Comment.create(req.body)
		.then((comment) => {
			userObjectId = toId(req.params.userId);
			comment.author = userObjectId;

			return comment.save()
		})
		.then(comment => {
			console.log(comment);
			Recipe.findById({_id:req.params.recipeId})
				.then((recipe) => {
					recipe.comments.push(comment);
					return recipe.save()
				})
				.then(added => {
					res.json(added)
				})
				.catch(next)
		})
		.catch(next)
});

//PUT updates
router.put('/comments/:id/edit', (req, res, next) => {
	Comment.findByIdAndUpdate({ _id: req.params.id }).then((comment) => {
		console.log(comment);
		Recipe.findOne({ 'comments._id': req.params.id })
			.then((recipe) => {
				recipe.comments.id(req.params.id).post = req.body.post;
				return recipe.save();
			})
			.then(() => {
				res.sendStatus(204);
			});
	});
});

//DELETE
router.delete('/comments/:id/delete', (req, res, next) => {
	Comment.findByIdAndDelete({_id:req.params.id})
		.then((comment) => {
			console.log(comment);
			Recipe.findOne({'comments._id':req.params.id})
				.then(recipe => {
					recipe.comments.id(req.params.id).remove()
					return recipe.save()
				})
				.then(() => {
					res.sendStatus(204)
				})
		})
		.catch(next)
	});


module.exports = router;