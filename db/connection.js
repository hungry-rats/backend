const mongoose = require('mongoose')

const mongoURI = process.env.DB_URL

mongoose
	.connect(mongoURI, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useFindAndModify: false,
	})
	.then((instance) => {
		console.log(`connected to ${instance.connections[0].name}`);
	})
	.catch(console.error);

module.exports = mongoose;
