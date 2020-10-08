const express = require('express')
const router = express.Router()
const Admin = require('../models/admin')
const Guard = require('../models/guard')
const Visitor = require('../models/visitor')
const Apartment = require('../models/apartment')

const VisitorPreApproved = require('../models/visitorPreApproved')
const VisitorEntryLogs = require('../models/visitorEntryLogs')
const DailyHelperRemarks = require('../models/dailyHelperRemarks')
const DailyHelper = require('../models/dailyHelper')


const mongoose = require('mongoose')

const ObjectId = mongoose.Types.ObjectId

const { residentAuth } = require('../middleware/auth')
const Resident = require('../models/resident')

// WHO AM I????
router.get('/whoami', residentAuth, async (req, res) => {
    try {
        let resident = req.resident
        res.status(201).send(resident)
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            error: error
        })
    }
})
// Hire Helper
router.put('/hireHelper', residentAuth, async (req, res) => {
    try {
        const {
            dailyHelperId,
            time,
            isAvailable
        } = req.body
        let apartmentId = req.resident.apartmentId
        if(isAvailable == true){
            apartmentId = null
        }
        for(let i = 0; i<time.length; i++){
            let res = await DailyHelper.updateOne(
                {
                    _id: ObjectId(dailyHelperId),
                    timeSlots: {
                        $elemMatch: { time: time[i] }
                    }
                },
                {
    
                    $set: { 'timeSlots.$.isAvailable': isAvailable, 'timeSlots.$.apartmentId' : apartmentId }
                }
            )
        }
     
        res.status(201).send({
            success: true,
        })

    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: true,
            error: error
        })
    }
})


// Get Helper details

router.get('/getHelperDetails/:dailyHelperId', residentAuth, async (req, res) => {
    try {
        let dailyHelperId = req.params.dailyHelperId
        let helper = await DailyHelper.findOne({
            _id: ObjectId(dailyHelperId)
        })
        res.status(201).send({
            success: true,
            data: helper
        })

    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            error: error
        })
    }
})


// Personal helpers and society helpers
router.get('/helpers', residentAuth, async (req, res) => {
    try {
        let societyId = req.resident.societyId
        let apartmentId = req.resident.apartmentId
        let helper = await DailyHelper.find({
            societyId: societyId
        })
        let personalHelpers = []
        let societyHelpers = []
        for (let i = 0; i < helper.length; i++) {
            let checkCount = 0
            for (let j = 0; j < helper[i].apartmentIds.length; j++) {
                if (helper[i].apartmentIds[j].apartmentId == apartmentId) {
                    checkCount++;
                    personalHelpers.push(helper[i])
                }
            }
            if (checkCount === 0) {
                societyHelpers.push(helper[i])
            }
        }
        res.status(201).send({
            success: true,
            data: {
                personalHelpers: personalHelpers,
                societyHelpers: societyHelpers
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


router.get('/visitorEntries/:visitorId', residentAuth, async (req, res) => {
    try {
        let visitorId = req.params.visitorId
        let apartmentId = req.resident.apartmentId

        let visEntries = await VisitorEntryLogs.find({
            apartmentId: apartmentId,
            visitorId: visitorId
        })
        res.status(201).send({
            success: true,
            data: visEntries
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            error: error
        })
    }
})

// Get all visitors
router.get('/visitors', residentAuth, async (req, res) => {
    try {
        let residentId = req.resident._id
        let apartmentId = req.resident.apartmentId


        let visLastEntries = await VisitorEntryLogs.aggregate([
            {
                $match: { apartmentId: apartmentId }
            },
            {
                $group: {
                    _id: "$visitorId",
                    checkInTime: { "$last": "$checkInTime" }
                }
            },
            { $addFields: { "visitorId": { "$toObjectId": "$_id" } } },

            { $lookup: { from: "visitors", localField: "visitorId", foreignField: "_id", as: "details" } },
        ])
        console.log(visLastEntries)
        res.status(201).send({
            success: true,
            data: visLastEntries
        })

    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            error: error
        })
    }
})



// get All Apartments
router.get('/allApartments/:societyId', async (req, res) => {
    try {
        let societyId = req.params.societyId
        let result = await Apartment.find({
            societyId: societyId
        })
        res.status(201).send({
            success: true,
            data: result
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            error: error
        })
    }
})

// Add Remarks
router.post('/addRemarks', residentAuth, async (req, res) => {
    try {
        const {
            dailyHelperId,
            remarkUrl,
            remarkText
        } = req.body
        let societyId = req.resident.societyId;
        let apartmentId = req.resident.apartmentId;
        let residentId = req.resident._id
        let remark = new DailyHelperRemarks({
            societyId,
            apartmentId,
            dailyHelperId,
            remarkUrl,
            remarkText,
            residentId
        })
        let result = await remark.save()
        res.status(201).send({
            success: true,
            data: result
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            error: error
        })
    }
})

// Check Resident 
router.get('/checkResident/:residentMobileNumber', async (req, res) => {
    try {
        let residentMobileNumber = req.params.residentMobileNumber
        const resident = await Resident.findByCredentials(residentMobileNumber)
        const token = await resident.generateAuthToken()
        await resident.save()
        res.status(201).send({
            success: true,
            data: resident,
            token
        })
    } catch (error) {
        console.log(typeof error)
        res.status(400).send({
            success: false,
            error: String(error)

        })
    }
})


// Add resident
router.post('/register', async (req, res) => {
    try {
        const {
            residentMobileNumber,
            residentName,
            apartmentId,
            societyId,
            deviceIds
        } = req.body

        let resident = new Resident({
            residentMobileNumber,
            residentName,
            apartmentId,
            societyId,
            deviceIds
        })
        const token = await resident.generateAuthToken()

        let result = await resident.save()

        res.status(201).send({
            success: true,
            data: result,
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



// Send Request Status for visitor to guard
router.post('/entryStatus/', async (req, res) => {
    try {
        const {
            visitorEntryId,
            status
        } = req.body

        await VisitorEntryLogs.updateOne({ _id: ObjectId(visitorEntryId) }, { $set: { status: status } })
        let result = await VisitorEntryLogs.findOne({ _id: visitorEntryId })
        let message = status
        // await Notification.push(result[i].deviceId, 'Entry Permission', message, 'visitor')
        res.status(201).send({
            success: true,
            data: result
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            error: error
        })
    }
})

//  Visitor pre approved request API
router.post('/visitorPreApproved', residentAuth, async (req, res) => {
    try {
        let societyId = req.resident.societyId || "asasdasd";
        let apartmentId = req.resident.apartmentId || "asdasdasd";
        let residentId = req.resident.residentId || "asdasswq";
        let visitorObj;
        const {
            visitorName,
            visitorAddress,
            visitorMobileNumber,
            vehicleNo,
            preApprovedDate
        } = req.body

        visitorObj = await Visitor.findOne({
            visitorMobileNumber: visitorMobileNumber
        })
        if (visitorObj === null) {
            let visitor = new Visitor({
                visitorName,
                visitorAddress,
                visitorMobileNumber,
                vehicleNo,
            })
            visitorObj = await visitor.save()
        }

        let visitorPreApproved = new VisitorPreApproved({
            visitorId: visitorObj._id,
            apartmentId,
            preApprovedDate,
            societyId,
            residentId
        })

        let result = await visitorPreApproved.save()

        res.status(201).send({
            success: true,
            data: result
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            error: error
        })
    }
})


module.exports = router