const express = require('express')
const router = express.Router()
const Admin = require('../models/admin')
const Guard = require('../models/guard')
const Visitor = require('../models/visitor')
const VisitorPreApproved = require('../models/visitorPreApproved')
const VisitorEntryLogs = require('../models/visitorEntryLogs')
const mongoose = require('mongoose')

const ObjectId = mongoose.Types.ObjectId

const {residentAuth} = require('../middleware/auth')

// Send Request Status for visitor to guard
router.post('/entryStatus/', async (req, res) => {
    try{
        const{
            visitorEntryId,
            status
        } = req.body
        
        await VisitorEntryLogs.updateOne({_id : ObjectId(visitorEntryId)},{ $set: { status: status} })
        let result = await VisitorEntryLogs.findOne({ _id: visitorEntryId})
        let message = status
        // await Notification.push(result[i].deviceId, 'Entry Permission', message, 'visitor')
        res.status(201).send({
            success :  true,
            data:  result
        })
    }catch(error){
        console.log(error)
        res.status(400).send({
            success :  false,
            error:  error
        })
    }
})

//  Visitor pre approved request API
router.post('/visitorPreApproved', async (req, res) => {
        try{
            let societyId = req.resident.societyId || "asasdasd";
            let apartmentId = req.resident.apartmentId || "asdasdasd";
            let residentId = req.resident.residentId || "asdasswq";
            let visitorObj;;
            const {
                visitorName,
                visitorAddress,
                visitorMobileNumber,
                vehicleNo,
                preApprovedDate
            } = req.body

            visitorObj = await Visitor.findOne({
                visitorMobileNumber : visitorMobileNumber
            })
            if(visitorObj === null){
                let visitor = new visitor({
                    visitorName,
                    visitorAddress,
                    visitorMobileNumber,
                    vehicleNo,
                })
                visitorObj = await visitor.save()
            }
           
            let visitorPreApproved = new VisitorPreApproved({
                visitorId : visitorObj._id,
                apartmentId,
                preApprovedDate,
                societyId,
                residentId
            })

            let result = await visitorPreApproved.save()
            res.status(201).send({
                success :  true,
                data :  result
            })
        }catch(error){
            console.log(error)
            res.status(400).send({
                success :  false,
                error :  error
            })
        }
})


module.exports = router