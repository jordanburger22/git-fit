const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userExerciseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    weightLifted: {
        type: String
    },
    reps: {
        type: Number
    },
    sets: {
        type: Number
    },
    distance: {
        type: String
    },
    time: {
        type: String
    },
    workout: {
        type: Schema.Types.ObjectId,
        ref: "Workout",
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("UserExercise", userExerciseSchema)