const express = require('express')
const UserExercise = require('../models/userExercise.js')
const UserExerciseRouter = express.Router()

// Get Exercises by Workout

UserExerciseRouter.get('/:workoutId', (req, res, next) => {
    UserExercise.find({workout: req.params.workoutId}, (err, exercises) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(exercises)
    })
})



// Add Exercise
UserExerciseRouter.post('/:workoutId', (req, res, next) => {
    req.body.workout = req.params.workoutId
    const newExercise = new UserExercise(req.body)
    newExercise.save((err, savedExercise) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedExercise)
    })
})

//Update Exercise

UserExerciseRouter.put('/:exerciseId', (req, res, next) => {
    UserExercise.findOneAndUpdate(
        {_id: req.params.exerciseId},
        req.body,
        {new: true},
        (err, updatedExercise) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedExercise)
        }
    )
})

//Delete one Exercise

UserExerciseRouter.delete('/:exerciseId', (req, res, next) => {
    UserExercise.findOneAndDelete(
        {_id: req.params.exerciseId},
        (err, deletedExercise) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send('Exercise succesfully delted')
        }
    )
})

// Delete all exercises by workoutId

UserExerciseRouter.delete('/workout/:workoutId', (req, res, next) => {
    UserExercise.deleteMany(
        {workout: req.params.workoutId},
        (err, deletedExercises) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send('exercises deleted')
        }
    )
})

module.exports = UserExerciseRouter