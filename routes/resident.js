const express = require('express')
const router = express.Router()
const Admin = require('../models/admin')
const Guard = require('../models/guard')
const Visitor = require('../models/visitor')

const {residentAuth} = require('../middleware/auth')



//  Visitor pre approved request API
router.post('/visitorPreApproved', residentAuth, async (req, res) => {
        try{
            let societyId = req.resident.societyId;
            let appartmentId = req.resident.appartmentId;
            let residentId = req.resident.residentId;
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
           
            let visitorPreApproved = new visitorPreApproved({
                visitorId : visitorObj._id,
                appartmentId,
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

// Accept or decline Api
router.patch('/requestStatus', residentAuth, async (req, res) => {
        try{
           const{
               visitorId,
               status,
           }

            

        }catch(error){
            console.log(error)
            res.status(400).send({
                success :  false,
                error :  error
            })
        }
})

module.exports = router