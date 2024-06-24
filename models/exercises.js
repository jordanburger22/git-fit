const mongoose = require('mongoose')
const Schema = mongoose.Schema

const exerciseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    mainMuscleWorked: {
        type: String,
        required: true
    },
    secondaryMuscleWorked: {
        type: String
    }
})

module.exports = mongoose.model( "Exercises", exerciseSchema)