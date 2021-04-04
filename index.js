const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Recipes Routes
const RecipeRoutes = require('./controllers/RecipeRoute');
app.use('/', RecipeRoutes);

//User Routes
const UserRoutes = require('./controllers/UserRoutes');
app.use('/users', UserRoutes);

//Comments Route
const CommentRoutes = require('./controllers/CommentRoute');
app.use('/', CommentRoutes);

dotenv.config();
app.set('port', process.env.PORT || 8000);

// Require the error handlers
const {
	handleErrors,
	handleValidationErrors,
} = require('./middleware/custom_errors');
app.use(handleValidationErrors);
// The catch all for handling errors
// MUST BE PLACED IMMEDIATELY BEFORE `app.listen`
app.use(handleErrors);

app.listen(app.get('port'), () => {
	console.log(`PORT: ${app.get('port')}`);
});
