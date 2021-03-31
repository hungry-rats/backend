const express = require('express');
const router = express.Router();

const Recipe = require('../models/Recipes');
const User = require('../models/Users')


//GET all recipes
router.get('/recipes', (req,res,next) => {
	Recipe.find({})
		.then((recipes) => {
			res.json(recipes);
		})
		.catch(next);
})
	

// GET all User recipes
router.get('/Users/:userId/recipes', (req, res, next) => {
	// console.log(req.params);

	User.findById({ _id: req.params.userId }).then((user) => {
		res.json(user.recipes);
	});
});

//GET by id
router.get('/recipes/:Id', (req, res, next) => {
	Recipe.findById({ _id: req.params.Id })
		.then((recipe) => {
			res.json(recipe);
		})
		.catch(next);
});

//POST creates recipe
router.post('/users/:userId/recipes/create', (req, res, next) => {

	Recipe.create(req.body)
		.then(newRecipe => {
			User.findOneAndUpdate(
				req.params.userId,
				{ $push: {recipes: newRecipe } },
				{ new: true }
			)
				.then(added => {
					res.json(added)
				})
		})
		.catch(next)
});

//PUT updates
router.put('/recipes/:id', (req, res, next) => {
	Recipe.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
		.then((recipe) => res.json(recipe))
		.catch(next);
});

//DELETE
router.delete('/recipes/:id', (req, res, next) => {
	Recipe.findByIdAndDelete(req.params.id).then((recipe) => {
		res.json(recipe).catch(next);
	});
});

module.exports = router;
