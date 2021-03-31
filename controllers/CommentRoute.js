const express = require('express');
const router = express.Router();
const Comment = require('../models/Comments');
const Recipe = require('../models/Recipes');

// GET all users
router.get('/:recipeId/comments', (req, res, next) => {
	Recipe.findById({ _id: req.params.recipeId }).then((recipe) =>
		res.json(recipe.comments)
	);

	// Comment.find({})
	// 	.then((comments) => {
	// 		res.json(comments);
	// 	})
	// 	.catch(next);
});

//POST creates user
router.post('/', (req, res, next) => {
	Comment.create(req.body)
		.then((comment) => res.json(comment))
		.catch(next);
});

//PUT updates
router.put('/:id', (req, res, next) => {
	Comment.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
		.then((comment) => res.json(comment))
		.catch(next);
});

//DELETE
router.delete('/:id', (req, res, next) => {
	Comment.findByIdAndDelete(req.params.id).then((comment) => {
		res.json(comment).catch(next);
	});
});
module.exports = router;
