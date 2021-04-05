const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Comment = require('../models/Comments').CommentsModel;
const Recipe = require('../models/Recipes');
const { requireToken } = require('../middleware/auth');
const { handleValidateOwnership } = require('../middleware/custom_errors');

// GET all recipe comments
router.get('/:recipeId/comments', (req, res) => {
	Recipe.findById({ _id: req.params.recipeId }).then((recipe) =>
		res.json(recipe.comments)
	);
});


// GET current user comments
router.get('/comments',requireToken,(req,res)=> {
	Comment.find({author:req.user.id})
		.then(comments => res.json(comments))
})



// USER POST COMMENT TO RECIPE
// FINAL PRODUCT
router.post('/:recipeId/comments/create', requireToken, (req, res, next) => {
	const newComment = {
		...req.body,
		author: req.user._id,
	};
	Comment.create(newComment)
		.then((newComment) => {
			return Comment.findById(newComment._id).populate('author', 'username');
		})
		.then((newComment) => {
			Recipe.findById({ _id: req.params.recipeId })
				.then((recipe) => {
					recipe.comments.push(newComment);
					return recipe.save();
				})
				.then((recipe) => {
					res.json(recipe);
				})
				.catch(next);
		});
});

//PUT updates
//FINAL PRODUCT
router.put(
	'/:recipeId/comments/:commentId/edit',
	requireToken,
	(req, res, next) => {
		Comment.findById(req.params.commentId)
			.then((comment) => {
				return handleValidateOwnership(req, comment);
			})
			.then((comment) => {
				comment.post = req.body.post;
				return comment.save();
			})
			.then((comment) => {
				Recipe.findById({ _id: req.params.recipeId }).then((recipe) => {
					recipe.comments.forEach(async (rComment) => {
						if (rComment._id.toString() == comment._id.toString()) {
							rComment.post = comment.post;
							await recipe.save();
						}
					});
				});
				res.sendStatus(202);
			})
			.catch(next);

		//Old version for demonstration

		// Comment.findByIdAndUpdate({ _id: req.params.id }).then((comment) => {
		// 	console.log(comment);
		// 	Recipe.findOne({ 'comments._id': req.params.id })
		// 		.then((recipe) => {
		//
		// 		})
		// 		.then(() => {
		// 			res.sendStatus(204);
		// 		});
		// });
	}
);

//DELETE
//FINAL PRODUCT
router.delete(
	'/:recipeId/comments/:commentId/delete',
	requireToken,
	(req, res, next) => {
		Comment.findById(req.params.commentId)
		.then((comment) => {
			return handleValidateOwnership(req, comment);
		})
			.then(() => {
				Comment.findByIdAndDelete(req.params.commentId).then((comment) => {
					Recipe.findById(req.params.recipeId).then((recipe) => {
						recipe.comments.forEach(async (rComment, index) => {
							if (rComment._id.toString() == comment._id.toString()) {
								recipe.comments.splice(index, 1);
								await recipe.save();
							}
							res.status(201);
						});
					});
				});
			})
			.then(() => res.status(201))
			.catch(next);

		//old version

		// Comment.findByIdAndDelete({_id:req.params.id})
		// 	.then((comment) => {
		// 		console.log(comment);
		// 		Recipe.findOne({'comments._id':req.params.id})
		// 			.then(recipe => {
		// 				recipe.comments.id(req.params.id).remove()
		// 				return recipe.save()
		// 			})
		// 			.then(() => {
		// 				res.sendStatus(204)
		// 			})
		// 	})
		// 	.catch(next)
	}
);

module.exports = router;
