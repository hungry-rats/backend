const express = require('express')
const User = require('../models/Users')
const router = express.Router()
const bcrypt = require('bcrypt');

// GET all users
router.get('/', (req, res, next) => {
	User.find({})
		.then((users) => {
			res.json(users);
		})
		.catch(next);
});

//GET by id
router.get('/:id', (req, res, next) => {
	User.findById({ _id: req.params.id })
		.then((user) => {
			res.json(user);
		})
		.catch(next);
});

//POST creates user
router.post('/create', async (req, res, next) => {
	User.create(req.body)
		.then((user) => res.json(user))
		.catch(next);
});

//DELETE
router.delete('/:id', (req, res, next) => {
	User.findByIdAndDelete(req.params.id).then((user) => {
		res.json(user).catch(next);
	});
});



module.exports = router