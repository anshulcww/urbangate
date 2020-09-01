const express = require('express')
const router = express.Router()
const {guardAuth} = require('../middleware/auth')
const Guard = require('../models/guard')
const Resident = require('../models/resident')
const mongoose = require('mongoose')
const Config = require('../config')

const ObjectId = mongoose.Types.ObjectId

// Check guard 
router.get('/checkGuard/:phoneNumber', async (req, res) => {
    try{
        let society = await Society.find({
            phoneNumber : req.params.phoneNumber
        })
        res.status(201).send({
            success :  true,
            data :  society
        })
    }catch(err){
        console.log(err)
        res.status(400).send({
            success : false,
            err : err
        })
    }
})


// Api for pre approved visitors
router.get('/isPreApproved', guardAuth, async (req, res) => {
    try{
    let visitorSocietyId = req.guard.societyId
    let visitorDet = await Visitor.find({
        societyId :  visitorSocietyId,
        isPreapproved : true
    }).sort({_id : -1})
    
    res.status(201).send({
        success: true,
        visitors : visitorDet
    })
    }catch(error){
        console.log(error)
        res.status(400).send({
            success: false,
            error
        })
    }
})

// Guard Login request

router.post('/login', async (req, res) => {
    try {
        const {
            mobileNumber,
            password,
        } = req.body
        console.log(req.body)
        const guard = await Guard.findByCredentials(mobileNumber, password)
        const token = await guard.generateAuthToken()
        await guard.save()
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
            visitorName,
            contactPerson,
            visitorImageUrl,
            mobileNo,
            vehicleNo,
            residentId,
            visitorAddress,
            guardId
        } = req.body

        //Get residentId details
        let resDetails = await Resident.find({_id : ObjectId(residentId)})
        let message = `Hi! ${visitorName} requested you to accept the permission for entering in the society`

        // Send Notification to the resident
        if (resDetails && resDetails.deviceIds && resDetails.deviceIds.length > 0) {
            console.log(resDetails.name)
            await Notification.push(resDetails.deviceIds, 'Entry Permission', message, 'visitor')
        }

        const visitor = new Visitor({
            residentId: residentId,
            residentId: residentId,
            visitorAddress: visitorAddress,
            visitorPhoneNumber: mobileNo,
            vehicleNo: vehicleNo,
            flatNo: flatNo,
            isPreapproved: false,
            checkInTime: checkInTime,
            visitorImageUrl: visitorImageUrl,
            contactPerson: contactPerson,
            guardId : guardId
        })
        await visitor.save()
        res.status(201).json({
            success: true,
            message:  'notification send to the resident'
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            error: 'Something went wrong'
        })

    }
})
module.exports = router;
