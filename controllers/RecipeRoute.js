const express = require('express');
const router = express.Router();

const Recipe = require('../models/Recipes');

// GET all recipes
router.get('/', (req, res, next) => {
	Recipe.find({})
		.then((recipes) => {
			res.json(recipes);
		})
		.catch(next);
});

//GET by id
router.get('/:id', (req, res, next) => {
	Recipe.findById({ _id: req.params.id })
		.then((recipe) => {
			res.json(recipe);
		})
		.catch(next);
});

//POST creates recipe
router.post('/', (req, res, next) => {
	Recipe.create(req.body)
		.then((recipe) => res.json(recipe))
		.catch(next);
});

//PUT updates
router.put('/:id', (req, res, next) => {
	Recipe.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
		.then((recipe) => res.json(recipe))
		.catch(next);
});

//DELETE
router.delete('/:id', (req, res, next) => {
	Recipe.findByIdAndDelete(req.params.id).then((recipe) => {
		res.json(recipe).catch(next);
	});
});

module.exports = router;
