
const express = require('express')
const router = express.Router()
const { guardAuth } = require('../middleware/auth')
const Guard = require('../models/guard')
const Resident = require('../models/resident')
const Appartment = require('../models/appartment')

const Visitor = require('../models/visitor')

const mongoose = require('mongoose')
const Config = require('../config')

const ObjectId = mongoose.Types.ObjectId


// For Adding Visitor
router.post('/addVisitor', guardAuth, async (req, res) => {
    try {

        let guardId = req.guard._id
        let societyId = req.guard.societyId
        const {
            appartmentId,
            visitorName,
            // visitorImageUrl,
            visitorMobileNumber,
            vehicleNo,
            visitorAddress,
            visitorId,
            checkInTime
        } = req.body
        
        let visitorObj;
        let result;
        if(visitorId){
            // Update Query
            let visDetails = await Visitor.findOne({_id : ObjectId(visitorId)})
            visDetails.visitorName = visitorName,
            visDetails.visitorMobileNumber = visitorMobileNumber,
            visDetails.vehicleNo = vehicleNo,
            visDetails.visitorAddress = visitorAddress,
            visDetails.checkInTime = checkInTime,
            visitorObj = await visDetails.save()
            // Check Pre Approval
            
                            
        }else{
            let visitor = new Visitor({
                visitorName,
                visitorMobileNumber,
                vehicleNo,
                visitorAddress,
                checkInTime
            })
            visitorObj  = await visitor.save()
        }
        // Check Preapproval
        let entryLog = new VisitorEntryLogs({
            appartmentId,
            visitorId : visitorObj._id,
            guardId,
            checkInTime,
            societyId
        })
        await entryLog.save()
        res.status(201).json({
            success: true,
            data: visitorObj
        })
        // Get residentId details
        // let resDetails = await Resident.find({ appartmentId: appartmentId })
        // let message = `Hi! ${visitorName} requested you to accept the permission for entering in the society`

        // if(resDetails && resDetails.length > 0){
        //     for(let i = 0; i < resDetails.length; i++){
        //         console.log(resDetails.name)
        //         await Notification.push(resDetails[i].deviceIds, 'Entry Permission', message, 'visitor')
        //     }
        // }

      
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            error: 'Something went wrong'
        })

    }
})

// Get All Appartment
router.get('/appartments', guardAuth, async (req, res) => {
    try {
        console.log(req.guard)
        let societyId = req.guard.societyId
        let appartments = await Appartment.find({
            societyId: societyId
        })
        if (appartments && appartments.length > 0) {
            res.status(201).send({
                success: true,
                data: appartments
            })
        } else {
            res.status(201).send({
                success: false,
                message: "No Apparment"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            error: error
        })
    }
})

// WHO AM I????
router.get('/whoami', guardAuth, async (req, res) => {
    try {
        let guard = req.guard
        res.status(201).send(guard)
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            error: error
        })
    }
})
// // Check IN Api for Visitor
// router.put('/visitorCheckIn', guardAuth, async (req, res) => {
//     try{
//         const {
//             visitorId,
//             checkInTime
//         } = req.body
//         let date = new Date(checkInTime)
//         let result = await Visitor.updateOne({_id : ObjectId(visitorId)},{ $set: { checkInTime: date} })
//         // let visitor = await Visitor.findOne({_id : ObjectId(visitorId)})
//         // visitor.address = "ajggj"
//         // let result  = await visitor.save()
//         res.status(201).send({
//             success : true,
//             data : result
//         })
//     }catch(error){
//         console.log(error)
//         res.status(400).send({
//             success : false,
//             error : error
//         })
//     }
// })

// Check visitor 
router.get('/checkVisitor/:visitorMobileNumber', async (req, res) => {
    try {
        let visitor = await Visitor.findOne({
            visitorMobileNumber: req.params.visitorMobileNumber
        })
        res.status(201).send({
            success: true,
            data: visitor
        })
    } catch (err) {
        console.log(err)
        res.status(400).send({
            success: false,
            error: err
        })
    }
})


// // Api for pre approved visitors
// router.get('/isPreApproved/:mobileNumber', guardAuth, async (req, res) => {
//     try{
//     let visitorSocietyId = req.guard.societyId
//     let visitorDet = await Visitor.find({
//         societyId :  visitorSocietyId,
//         isPreapproved : true,
//     }).sort({_id : -1})

//     res.status(201).send({
//         success: true,
//         visitors : visitorDet
//     })
//     }catch(error){
//         console.log(error)
//         res.status(400).send({
//             success: false,
//             error
//         })
//     }
// })

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


module.exports = router;
