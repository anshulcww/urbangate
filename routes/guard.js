const express = require('express')
const router = express.Router()
const guardAuth = require('../middleware/auth')
// const User = require('../models/user')
// const Audit = require('../models/audit')
const mongoose = require('mongoose')

const ObjectId = mongoose.Types.ObjectId

// Guard Login request

router.post('/login', async (req, res) => {
    try {
        const {
            mobileNumber,
            password,
        } = req.body
        const guard = await Guard.findByCredentials(mobileNumber, password)
        const token = await guard.generateAuthToken()
        await user.save()
        res.status(201).json({
            success: true,
            guard,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            error
        })

    }
})

// For Adding Visitor
router.post('/addVisitor' , guardAuth,  async (req, res) => {
    try {
        const {
            flatNo,
            imageUrl,
            mobileNo,
            vehicleNo,
            residentId
        } = req.body
        
        // Send Notification to the residents

        const visitor = await Visitor.addVisitor(mobileNumber, password)
        const token = await guard.generateAuthToken()
        await user.save()
        res.status(201).json({
            success: true,
            guard,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            error
        })

    }
})