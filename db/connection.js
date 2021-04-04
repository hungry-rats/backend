const mongoose = require('mongoose')

const mongoURI =
	'mongodb+srv://qwerty:keRXPU4ftCLylucl@cluster0.4u8fy.mongodb.net/seefood?retryWrites=true&w=majority';

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
