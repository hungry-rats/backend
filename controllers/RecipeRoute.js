require('dotenv').config()

const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipes');
const User = require('../models/Users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {
	createUserToken
} = require('../middleware/auth');
const {
	requireToken
} = require('../middleware/auth');


// const authenticateToken = (req, res, next) => {
// 	const authHeader = req.headers['authorization'];
// 	const token = authHeader && authHeader.split(' ')[1];
// 	if (token == null) return res.sendStatus(419);

// 	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
// 		if (err) return res.sendStatus(403);
// 		req.user = user;
// 		next();
// 	});
// };


// GET all recipes
router.get('/recipes', (req, res, next) => {
	Recipe.find({})
		.then((recipes) => {
			res.json(recipes);
		})
		.catch(next);
})


//TESTING
// router.get('/recipes', authenticateToken, (req, res, next) => {
// 	const recipes = Recipe.find({});
// 	console.log(recipes.path);
// 	res.json(recipes.filter((recipe) => recipe.username === req.user.name));

// Recipe.find({})
// 	.then((recipes) => {
// 		res.json(recipes);
// 	})
// 	.catch(next);
// });


// GET all User recipes
router.get('/Users/:userId/recipes', (req, res, next) => {
	// console.log(req.params);

	User.findById({
		_id: req.params.userId
	}).then((user) => {
		res.json(user.recipes);
	});
});

//GET by id
router.get('/recipes/:Id', (req, res, next) => {
	Recipe.findById({
		_id: req.params.Id,
	})
		.populate('author', "username")
		.then((recipe) => {
			res.json(recipe);
		})
		.catch(next);
});

//POST creates recipe
router.post('/recipes', requireToken, (req, res, next) => {
	const newRecipe = {
		...req.body,
		author: req.user._id,
	}
	Recipe.create(newRecipe)
		.populate('author', 'username')
		.then(newRecipe => {
			res.json(newRecipe);
		})
		.catch(next)
});

//PUT updates
router.put('/recipes/:id', (req, res, next) => {
	Recipe.findOneAndUpdate({
			_id: req.params.id
		}, req.body, {
			new: true
		})
		.then((recipe) => res.json(recipe))
		.catch(next);
});

//DELETE
router.delete('/recipes/:id', (req, res, next) => {
	Recipe.findByIdAndDelete(req.params.id).then((recipe) => {
		res.json(recipe).catch(next);
	});
});

//LOGIN AUTHORIZATION
// SIGN IN
// POST /api/signin
router.post('/signin', (req, res, next) => {
	User.findOne({
			username: req.body.username
		})
		// Pass the user and the request to createUserToken
		.then((user) => createUserToken(req, user))
		// createUserToken will either throw an error that
		// will be caught by our error handler or send back
		// a token that we'll in turn send to the client.
		.then((token) => res.json({
			token
		}))
		.catch(next);
})





// router.post('/login', (req, res, next) => {
// 	const username = req.body.username
// 	const password = req.body.password
// 	let data;
// 	let userId;

// 	const user = {
// 		name: username
// 	}

// 	if (username.length > 0 && password.length > 0) {
// 		data = {
// 			username: username
// 		}
// 	} else {
// 		res.json({
// 			status: 0,
// 			message: 'err'
// 		})
// 	}

// 	User.findOne(data, (err, user, res) => {
// 			userId = user._id

// 			bcrypt.compare(req.body.password, user.password, (err, res) => {
// 				if (err) {
// 					console.log('error')
// 				} else if (!res) {
// 					console.log('wrong password')
// 				} else {
// 					console.log(userId)
// 				}
// 			})
// 		})
// 		.then(() => {
// 			const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
// 			res.json({
// 				accessToken: accessToken,
// 				userId: userId
// 			});
// 		})
// 		.catch(console.error)
// });



module.exports = router;