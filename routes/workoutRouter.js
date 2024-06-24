const express = require('express')
const Workout = require('../models/workout.js')
const WorkoutRouter = express.Router()



// Get user workouts

WorkoutRouter.get('/', (req, res, next) => {
    Workout.find({ user: req.auth._id }, (err, workouts) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(workouts)
    })
})

// Add new workout

WorkoutRouter.post('/', (req, res, next) => {
    req.body.user = req.auth._id
    const newWorkout = new Workout(req.body)
    newWorkout.save((err, savedWorkout) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedWorkout)
    })
})

//Update a workout

WorkoutRouter.put('/:workoutId' , (req, res, next) => {
    Workout.findOneAndUpdate(
        {_id: req.params.workoutId, user: req.auth._id},
        req.body,
        {new: true},
        (err, updatedWorkout) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedWorkout)
        }
    )
})

//Delete workout

WorkoutRouter.delete('/:workoutId' , (req, res, next) => {
    Workout.findOneAndDelete({_id: req.params.workoutId}, (err, deletedWorkout) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`succesfully removed workout ${deletedWorkout._id}`)
    })
})

module.exports = WorkoutRouter