
const express = require('express')
const router = express.Router()
const { guardAuth } = require('../middleware/auth')
const Guard = require('../models/guard')
const Resident = require('../models/resident')
const Apartment = require('../models/apartment')

const Visitor = require('../models/visitor')

const VisitorEntryLogs = require('../models/visitorEntryLogs')

const VisitorPreApproved = require('../models/visitorPreApproved')

const DailyHelper = require('../models/dailyHelper')

const DailyHelperEntryLogs = require('../models/dailyHelperEntryLogs')

const DailyHelperRemarks = require('../models/dailyHelperRemarks')

const Delivery = require('../models/delivery')


const mongoose = require('mongoose')
const Config = require('../config')

const ObjectId = mongoose.Types.ObjectId


// Get deliveries
router.get('/deliveries', guardAuth,  async(req, res) => {
    try{
        let societyId = req.guard.societyId
        let result = await Delivery.aggregate([
            {
            $match: {societyId : societyId}
            },
            { $addFields: { "apartmentObj": { "$toObjectId": "$apartmentId" } } },
            { $lookup: { from: "apartments", localField: "apartmentObj", foreignField: "_id", as: "details" } },
        ])
        res.status(201).send({
            success: true,
            data: result
        })

    }catch(error){
        console.log(error)
        res.status(400).send({
            success: false,
            error: error
        })
    }
})

// Add Delivery 

router.post('/addDelivery', guardAuth, async (req, res) => {
    try {
        let societyId = req.guard.societyId
        let guardId = req.guard._id
        const {
            deliveryName,
            deliveryMobileNumber,
            deliveryType,
            apartmentIds,
            deliveryImageUrls,
            checkInTime
        } = req.body

        // Get Resident all resident Id

        // for(let i = 0; i<apartmentIds.length; i++){
        //     let id = apartmentIds[i].apartmentId

        //     // Get residentId details
        //     let resDetails = await Resident.find({ appartmentId: id })
        //     let message = `Hi! ${deliveryName} requested you to accept the permission for entering in the society`

        //     if(resDetails && resDetails.length > 0){
        //         for(let i = 0; i < resDetails.length; i++){
        //             console.log(resDetails.name)
        //             await Notification.push(resDetails[i].deviceIds, 'Entry Permission', message, 'delivery')
        //         }
        //     }
        // }

        for(let i = 0; i<apartmentIds.length; i++){
            let delivery = new Delivery({
                societyId,
                guardId,
                deliveryName,
                deliveryMobileNumber,
                deliveryType,
                apartmentId : apartmentIds[i].apartmentId,
                deliveryImageUrls,
                checkInTime
            })
            await delivery.save()
        }

       
        res.status(201).send({
            success: true,
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            error: error
        })
    }
})

// Get Daily helper profile and remarks
// Today entry in the 
router.get('/checkDailyHelper/:dailyHelperMobileNumber', guardAuth, async (req, res) => {
    try {
        let isCheckIn = false;
        let entryHelperId = null;
        let dailyHelperMobileNumber = req.params.dailyHelperMobileNumber
        let societyId = req.guard.societyId
        let checkHelper = await DailyHelper.findOne({
            societyId: societyId,
            helperMobileNumber: dailyHelperMobileNumber
        }, (err, result) => {
            if (err) {
                res.status(201).send({
                    success: false,
                    message: err
                })
            }
        })
        // check if Daily Help already check in

        let entryCheck = await DailyHelperEntryLogs.find({
            dailyHelperId: checkHelper._id
        }).sort({ _id: -1 }).limit(1)
        if (entryCheck) {
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            today = dd + '-' + mm + '-' + yyyy;
            // console.log(entryCheck[0]._id)
            if (entryCheck[0] && entryCheck[0].checkInTime && !entryCheck[0].checkOutTime ) {

                let entryDate = new Date()
                console.log(entryDate)
                var day = String(entryDate.getDate()).padStart(2, '0');
                var month = String(entryDate.getMonth() + 1).padStart(2, '0'); //January is 0!
                var year = entryDate.getFullYear();
                let date = day + "-" + month + "-" + year;
                console.log(date, today)
                if (date === today) {
                    isCheckIn = true
                    entryHelperId = entryCheck[0]._id
                    console.log(entryHelperId)
                }

            }
        }

        let remarks = await DailyHelperRemarks.find({
            dailyHelperId: checkHelper._id,
            societyId: societyId
        }).sort({
            _id: -1
        }).limit(20)
        let residentName  =  await Resident.findOne({
            
        })
        res.status(201).send({
            success: true,
            data: {
                helperDetails: checkHelper,
                remarks: remarks,
                isCheckIn : isCheckIn,
                dailyHelperEntryId : entryHelperId
            }
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            error: error
        })
    }
})

// Checkout time for Daily Helper
router.put('/checkoutDailyHelper', guardAuth, async (req, res) => {
    try{
        const {
            dailyHelperEntryId,
            checkOutTime
        } = req.body
        //let result = await DailyHelperEntryLogs.updateOne()
        let result = await DailyHelperEntryLogs.updateOne({_id : ObjectId(dailyHelperEntryId)},{ $set: { checkOutTime: checkOutTime} })
        res.status(201).send({
            success: true,
            data: result
        })

    }catch(error){
        console.log(error);
        res.status(400).send({
            success: false,
            error: error
        })
    }
})


// Check Helper and if exists send notification to residents
// and add entry into dailyhelp entry table

router.post('/dailyHelperEntry', guardAuth, async (req, res) => {
    try {
        let guardId = req.guard._id
        let societyId = req.guard.societyId
        const {
            dailyHelperId,
            checkInTime
        } = req.body

        // check if helper is registered
        let checkHelper = await DailyHelper.findOne({
            _id: ObjectId(dailyHelperId),
        }, (err, result) => {
            if (err) {
                res.status(201).send({
                    success: false,
                    message: err
                })
            }
        })

        let apartmentIds = checkHelper.apartmentIds
        let helperEntryLog = new DailyHelperEntryLogs({
            societyId,
            guardId,
            checkInTime,
            apartmentIds,
            dailyHelperId
        })
        let result = await helperEntryLog.save()
        res.status(201).send({
            success: true,
            data: result
        })
        // } else {
        //     res.status(201).send({
        //         success: true,
        //         message: "Not registered"
        //     })
        // }

    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            error: error
        })
    }
})


// Checkout for Daily helper

// For Adding Visitor
router.post('/addVisitor', guardAuth, async (req, res) => {
    try {

        let guardId = req.guard._id
        let societyId = req.guard.societyId
        const {
            apartmentId,
            visitorName,
            visitorImageUrl,
            visitorMobileNumber,
            vehicleNo,
            visitorAddress,
            visitorId,
            checkInTime,
            deviceId
        } = req.body
        console.log(req.body)
        let visitorObj;
        let isPreApproved = false;
        if (visitorId) {
            // Update Query
            let visDetails = await Visitor.findOne({ _id: ObjectId(visitorId) })
            visDetails.visitorName = visitorName
            visDetails.visitorMobileNumber = visitorMobileNumber
            visDetails.vehicleNo = vehicleNo
            visDetails.visitorAddress = visitorAddress
            visDetails.checkInTime = checkInTime
            visDetails.visitorImageUrl = visitorImageUrl
            visitorObj = await visDetails.save()

            // Check Pre Approval
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            today = dd + '-' + mm + '-' + yyyy;
            let preApprovedObj = await VisitorPreApproved.findOne({ visitorId: visitorId, preApprovedDate: today })
            if (preApprovedObj) {
                isPreApproved = true
            }

        } else {
            let visitor = new Visitor({
                visitorName,
                visitorMobileNumber,
                vehicleNo,
                visitorImageUrl,
                visitorAddress,
                checkInTime
            })
            visitorObj = await visitor.save()
        }

        let entryLog = new VisitorEntryLogs({
            apartmentId,
            visitorId: visitorObj._id,
            guardId,
            checkInTime,
            societyId,
            deviceId
        })
        await entryLog.save()
        res.status(201).json({
            success: true,
            isPreApproved: isPreApproved,
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
            error: error
        })

    }
})

// Get All Apartment
router.get('/apartments', guardAuth, async (req, res) => {
    try {
        console.log(req.guard)
        let societyId = req.guard.societyId
        let apartments = await Apartment.find({
            societyId: societyId
        })
        if (apartments && apartments.length > 0) {
            res.status(201).send({
                success: true,
                data: apartments
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
    } catch (err0r) {
        console.log(err0r)
        res.status(400).send({
            success: false,
            error: err0r
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
            error: error
        })

    }
})

// update password

router.post('/updatePassword', guardAuth, async (req, res) => {
    try {
        console.log(req.body)
        const {
            newPassword
        } = req.body
        let guardId = req.guard._id
        const guard = await Guard.findOne({
            _id: ObjectId(guardId)
        })
        if (guard) {
            guard.password = newPassword
            await guard.save()
            res.status(201).send({
                success: true
            })
        } else {
            res.status(201).send({
                success: false
            })
        }
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

// Forgot password

router.post('/forgotPassword', async (req, res) => {
    try {
        console.log(req.body)
        const {
            guardMobileNumber,
            newPassword
        } = req.body
        const guard = await Guard.findOne({
            guardMobileNumber: guardMobileNumber
        })
        if (guard) {
            guard.password = newPassword
            await guard.save()
            res.status(201).send({
                success: true
            })
        } else {
            res.status(201).send({
                success: false,
                message : "Guard not registered"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

module.exports = router;
