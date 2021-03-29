const mongoose = require('../db/connection');
const Recipes = require('./Recipes')

const bcrypt = require('bcrypt')

const Users = new mongoose.Schema({
    username: {type:String, unique:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true}, 
    recipes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recipes'
        }
    ]
})

Users.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

Users.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const UsersModel = mongoose.model('Users', Users)

module.exports = UsersModel
