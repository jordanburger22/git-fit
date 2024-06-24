const mongoose = require('mongoose')
const Schema = mongoose.Schema

const workoutSchema = new Schema({
    name:{
        type: String
    },
    day: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "fitnessUser",
        required: true
    }
})

module.exports = mongoose.model("Workout", workoutSchema)