const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const TestRoute = require('./controllers/TestRoute');
app.use('/seefood', TestRoute);

dotenv.config();
app.set('port', process.env.PORT || 8000);

app.listen(app.get('port'), () => {
	console.log(`PORT: ${app.get('port')}`);
});
