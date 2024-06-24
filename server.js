const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const {expressjwt} = require('express-jwt')
const path = require("path")

app.use(express.json())
app.use(morgan('dev'))

app.use(express.static(path.join(__dirname, "client", "build")))

mongoose.set('strictQuery', true)
mongoose.connect(
    'mongodb+srv://jordanburger22:.5HC5.FQHsqYVz8@cluster0.cihycu0.mongodb.net/?retryWrites=true&w=majority',
    () => console.log('Connected to the DB')
)

app.use('/profile', expressjwt({secret: process.env.SECRET, algorithms: ['HS256']}))

app.use('/auth', require('./routes/authRouter.js'))
app.use('/profile/workouts', require('./routes/workoutRouter.js'))
app.use('/profile/exercises', require('./routes/userExcerciseRouter.js'))
app.use('/profile/allExercises', require('./routes/exerciseRouter.js'))


app.use((err, req, res, next) => {
    console.log(err)
    if(err.name === 'UnathorizedError'){
        res.status(err.status)
    }
    return res.send({errMsg: err.message})
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
})

app.listen(8500, () => {
    console.log('server is running on 8500')
})