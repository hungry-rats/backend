const mongoose = require('mongoose')

const dbuser = 'seefood-user';
const password = 'SWvYN1mfRljRubs9';

const mongoURI = `mongodb+srv://${dbuser}:${password}@cluster0.4u8fy.mongodb.net/seefood?retryWrites=true&w=majority`;


mongoose.connect(mongoURI, {
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useFindAndModify:true
})
    .then(instance => {
        console.log(`connected to ${instance.connections[0].name}`);
    })
    .catch(console.error)

module.exports = mongoose
