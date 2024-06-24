const express = require('express')
const authRouter = express.Router()
const fitnessUser = require('../models/fitnessUsers.js')
const jwt = require('jsonwebtoken')

authRouter.post('/signup', (req, res, next) => {
    fitnessUser.findOne({username: req.body.username.toLowerCase()}, (err, user) => {
        if(err){
            res.status(500)
            return next(err)
        }
        if(user){
            res.status(403)
            return next(new Error('Username already taken'))
        }
        const newUser = new fitnessUser(req.body)
        newUser.save((err, savedUser) => {
            if(err){
                res.status(500)
                return next(err)
            }
            const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET)
            return res.status(201).send({ token, user: savedUser.withoutPassword() })
        })
    })
})

authRouter.post('/login', (req, res, next) => {
    fitnessUser.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
        if(err){
            res.status(500)
            return next(err)
        }
        if(!user){
            res.status(403)
            return next( new Error('Incorrect Username or Password'))
        }

        user.checkPassword(req.body.password, (err, isMatch) => {
            if(err){
                res.status(500)
                return next(err)
            }
            if(!isMatch){
                res.status(403)
                return next(new Error('Incorrect Username or Password'))
            }
            const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
            return res.status(200).send({ token, user: user.withoutPassword() })
        })
    })
})

module.exports = authRouter