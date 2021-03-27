const mongoose = require('../db/connection')

const Test = new mongoose.Schema({
    test:String
})

const TestModel = mongoose.model('Test', Test)

module.exports = TestModel