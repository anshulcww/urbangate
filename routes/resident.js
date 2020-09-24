const express = require('express')
const router = express.Router()
const Admin = require('../models/admin')
const Guard = require('../models/guard')
const Visitor = require('../models/visitor')
const Apartment = require('../models/apartment')

const VisitorPreApproved = require('../models/visitorPreApproved')
const VisitorEntryLogs = require('../models/visitorEntryLogs')
const DailyHelperRemarks = require('../models/dailyHelperRemarks')

const mongoose = require('mongoose')

const ObjectId = mongoose.Types.ObjectId

const { residentAuth } = require('../middleware/auth')
const Resident = require('../models/resident')

router.get('/visitorEntries/:visitorId', residentAuth, async (req, res) => {
    try{
        let visitorId = req.params.visitorId
        let apartmentId = req.resident.apartmentId

        let visEntries =  await VisitorEntryLogs.find({
            apartmentId : apartmentId,
            visitorId : visitorId
        })
        res.status(201).send({
            success: true,
            data: visEntries
        })
    }catch(error){
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
                $match: { apartmentId: apartmentId}
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

// Check visitor 
router.get('/checkResident/:residentMobileNumber', async (req, res) => {
    try {
        let resident = await Resident.findOne({
            residentMobileNumber: req.params.residentMobileNumber
        })
        const token = await guard.generateAuthToken()
        res.status(201).send({
            success: true,
            data: resident,
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
            let visitor = new visitor({
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