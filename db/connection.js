const mongoose = require('mongoose');

const mongoURI =
	process.env.NODE_ENV === 'production'
		? process.env.DB_URL
		: 'mongodb://localhost/seefood';

mongoose
	.connect(mongoURI, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useFindAndModify: true,
	})
	.then((instance) => {
		console.log(`connected to ${instance.connections[0].name}`);
	})
	.catch(console.error);

module.exports = mongoose;
