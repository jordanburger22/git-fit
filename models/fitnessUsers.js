const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const fitnessUserSchema = new Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userSince: {
        type: Date,
        default: Date.now
    }

})

fitnessUserSchema.pre('save', function(next){
    const fitnessUser = this
    if(!fitnessUser.isModified('password')) return next()
    bcrypt.hash(fitnessUser.password, 10, (err, hash) => {
        if(err) return next(err)
        fitnessUser.password = hash
        next()
    })
})

fitnessUserSchema.methods.checkPassword = function(passwordAttempt, callback){
    bcrypt.compare(passwordAttempt, this.password, (err, isMatch) => {
        if(err) return callback(err)
        return callback(null, isMatch)
    })
}

fitnessUserSchema.methods.withoutPassword = function(){
    const user = this.toObject()
    delete user.password
    return user
}

module.exports = mongoose.model("fitnessUser", fitnessUserSchema)