const express = require('express')
const Exercises = require('../models/exercises.js')
const exercisesRouter = express.Router()

exercisesRouter.get('/', (req, res, next) => {
    Exercises.find((err, exercise) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(exercise)
    })
})

exercisesRouter.post('/', (req, res, next) => {
    const newExercise = new Exercises(req.body)
    newExercise.save((err, savedExercise) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedExercise)
    })
})

exercisesRouter.get("/muscleWorked", (req, res, next) => {
    Exercises.find(
        {mainMuscleWorked: req.query.muscleWorked}, 
        (err, exercise) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(exercise)
    })
})


module.exports = exercisesRouter