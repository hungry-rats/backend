require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Recipe = require('../models/Recipes');
const User = require('../models/Users');
const { requireToken, createUserToken } = require('../middleware/auth');
const { handleValidateOwnership } = require('../middleware/custom_errors');

// GET all recipes
router.get('/recipes', (req, res, next) => {
	Recipe.find({})
		.populate('author', 'username')
		.then((recipes) => {
			res.json(recipes);
		})
		.catch(next);
});

// GET all User recipes
// FINAL PRODUCT
router.get('/users/recipes', requireToken, (req, res, next) => {
	Recipe.find({ author: mongoose.Types.ObjectId(req.user._id) })
		.then((recipes) => {
			res.json(recipes);
		})
		.catch(next);
});

//GET by id
router.get('/recipes/:Id', (req, res, next) => {
	Recipe.findById({
		_id: req.params.Id,
	})
		.populate('author', 'username')
		.then((recipe) => {
			res.json(recipe);
		})
		.catch(next);
});

//POST creates recipe
// FINAL PRODUCT
router.post('/recipes', requireToken, (req, res, next) => {
	const newRecipe = {
		...req.body,
		author: req.user._id,
	};
	Recipe.create(newRecipe)
		.then((newRecipe) => {
			return Recipe.findById(newRecipe._id).populate('author', 'username');
		})
		.then((newRecipe) => {
			res.json(newRecipe);
		})
		.catch(next);
});

//PUT updates a recipe
// FINAL PRODUCT
router.put('/recipes/:id/edit', requireToken, (req, res, next) => {
	Recipe.findById(req.params.id)
		.then((recipe) => {
			return handleValidateOwnership(req, recipe);
		})
		.then((recipe) => {
			if (req.body.title) {
				recipe.title = req.body.title;
			} else if (req.body.inspiredBy) {
				recipe.inspiredBy = req.body.inspiredBy;
			} else if (req.body.image) {
				recipe.image = req.body.image;
			} else if (req.body.directions) {
				recipe.directions = req.body.directions;
			} else if (req.body.allergies) {
				recipe.allergies = req.body.allergies;
			} else if (req.body.ingredients) {
				recipe.ingredients = req.body.ingredients;
			}

			recipe.save();
		})
		.then(() => {
			res.sendStatus(202);
		})
		.catch(next);
});

//DELETE
// FINAL PRODUCT
router.delete('/recipes/:id', requireToken, (req, res, next) => {
	Recipe.findById(req.params.id)
		.then((recipe) => {
			return handleValidateOwnership(req, recipe);
		})
		.then((recipe) => {
			recipe.deleteOne();
		})
		.then(() => {
			res.sendStatus(204);
		})
		.catch(next);
});

//LOGIN AUTHORIZATION
// SIGN IN
// POST /api/signin
router.post('/signin', (req, res, next) => {
	User.findOne({
		username: req.body.username,
	})
		.then((user) => createUserToken(req, user))
		.then((token) =>
			res.json({
				token,
			})
		)
		.catch(next);
});

module.exports = router;
