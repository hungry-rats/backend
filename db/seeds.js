const mongoose = require('./connection')
const Test = require('../models/Test')
const testData = require('./Test.json')

Test.deleteMany({})
    .then(() => Test.insertMany(testData))
    .catch(console.error)
    .finally(() => {
        process.exit
    })
