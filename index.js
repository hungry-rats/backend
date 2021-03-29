const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Recipes Routes
const RecipeRoutes = require('./controllers/RecipeRoute')
app.use('/seefood',RecipeRoutes)

dotenv.config();
app.set('port', /* process.env.PORT ||  */8000);

app.listen(app.get('port'), () => {
	console.log(`PORT: ${app.get('port')}`);
});
