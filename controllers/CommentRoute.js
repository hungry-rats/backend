import express from 'express';
import User from '../models/Users';
const router = express.Router();
const Comment = require('')

// GET all users
router.get('/', (req, res, next) => {
	Comment.find({})
		.then((comments) => {
			res.json(comments);
		})
		.catch(next);
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