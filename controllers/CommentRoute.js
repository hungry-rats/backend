const express = require('express');
const router = express.Router();
const Comment = require('../models/Comments').CommentsModel;
const Recipe = require('../models/Recipes');
const mongoose = require('mongoose')
const toId = mongoose.Types.ObjectId
const { requireToken, createUserToken } = require('../middleware/auth');
const {handleValidateOwnership} = require('../middleware/custom_errors')


// GET all recipe comments
router.get('/:recipeId/comments', (req, res, next) => {
	Recipe.findById({ _id: req.params.recipeId }).then((recipe) =>
		res.json(recipe.comments)
	);

});

//POST creates comment on recipe
// router.post('/:userId/:recipeId/comments/create', (req, res, next) => {
// 	Comment.create(req.body)
// 		.then((comment) => {
// 			userObjectId = toId(req.params.userId);
// 			comment.author = userObjectId;

// 			return comment.save()
// 		})
// 		.then(comment => {
// 			console.log(comment);
// 			Recipe.findById({_id:req.params.recipeId})
// 				.then((recipe) => {
// 					recipe.comments.push(comment);
// 					return recipe.save()
// 				})
// 				.then(added => {
// 					res.json(added)
// 				})
// 				.catch(next)
// 		})
// 		.catch(next)
// });

// USER POST COMMENT TO RECIPE
// FINAL PRODUCT
router.post('/:recipeId/comments/create', requireToken, (req, res, next) => {
	const newComment = {
		...req.body,
		author: req.user._id
	}
	Comment.create(newComment)
		.then((newComment) => {
			return Comment.findById(newComment._id).populate('author', 'username');
		})
		.then((newComment) => {
			Recipe.findById({ _id: req.params.recipeId })
				.then((recipe) => {
					recipe.comments.push(newComment)
					return recipe.save();
				})
				.then((recipe) => {
					res.json(recipe);
				})
				.catch(next);
		});})

//PUT updates
router.put('/:recipeId/comments/:commentId/edit',requireToken, (req, res, next) => {
	Comment.findById(req.params.commentId)
		.then((comment) => {
			return handleValidateOwnership(req, comment);
		})
		.then((comment) => {
			comment.post = req.body.post;
			return comment.save();
		})
		.then((comment) => {
			Recipe.findById({_id:req.params.recipeId})
				.then( (recipe) => {
					recipe.comments.forEach(async(rComment) => {
						if (rComment._id.toString() == comment._id.toString()) {
							console.log(rComment);
							rComment.post = comment.post;
							await recipe.save();
						}
					})
				})
			res.sendStatus(202);
		})
		.catch(next);




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