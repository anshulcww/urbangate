const express = require('express')
const router = express.Router()
const Admin = require('../models/admin')
const Guard = require('../models/guard')
const Resident = require('../models/resident')
const Apartment = require('../models/apartment')
const { adminAuth } = require('../middleware/auth')
const DailyHelper = require('../models/dailyHelper')

// Add Daily Help
router.post('/addHelper', adminAuth, async (req, res) => {
    try {
        let societyId = req.admin.societyId
        let adminId = req.admin._id

        const {
            helperName,
            helperMobileNumber,
            apartmentIds,
        } = req.body
        // check if already exists 
        let check = await DailyHelper.findOne({
            societyId: societyId,
            helperMobileNumber: helperMobileNumber
        }, (err, result) => {
            if (err) {
                res.status(201).send({
                    success: false,
                    err: err
                })
            }
            if(result){
                res.status(201).send({
                    success: false,
                    message: " Already Existed"
                })
            }
            })
        if(!check){
            let dailyhelp = new DailyHelper({
                adminId,
                societyId,
                helperName,
                helperMobileNumber,
                apartmentIds
            })
    
            let result = await dailyhelp.save()
            res.status(201).send({
                success: true,
                data: result
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
router.get('/whoami', adminAuth, async (req, res) => {
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

// Add Apartment
router.post('/addApartment', adminAuth, async (req, res) => {
    try {
        let adminId = req.admin._id
        let societyId = req.admin.societyId
        let apart = req.body.apartment
        let apartment = new Apartment({
            adminId,
            societyId,
            apartment: apart
        })
        let result = await apartment.save()
        res.status(201).send({
            success: true,
            data: result
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: error
        })
    }
})

// Add Resident
router.post('/addResident', adminAuth, async (req, res) => {
    try {
        let societyId = req.admin.societyId
        let adminId = req.admin._id
        const {
            residentName,
            residentMobileNumber,
            apartmentId,
        } = req.body

        let resident = new Resident({
            societyId,
            adminId,
            residentName,
            residentMobileNumber,
            apartmentId
        })
        // let pass = Math.floor(1000 + Math.random() * 9000);
        // guard.password = pass
        let result = await resident.save()
        // console.log(result)

        res.status(201).send({
            success: true,
            data: result
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: error
        })
    }
})


// Add Guard
router.post('/addGuard', adminAuth, async (req, res) => {
    try {
        const {
            guardName,
            guardMobileNumber,
            address,
        } = req.body
        let societyId = req.admin.societyId
        let adminId = req.admin._id
        let guard = new Guard({
            adminId,
            societyId,
            guardName,
            guardMobileNumber,
            address
        })
        let pass = Math.floor(1000 + Math.random() * 9000);
        guard.password = pass
        let result = await guard.save()
        // console.log(result)

        res.status(201).send({
            success: true,
            data: result
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: error
        })
    }
})

// Create admin API
router.post('/register', async (req, res) => {
    try {
        const {
            societyId,
            adminName,
            address,
            adminMobileNumber,
            email,
            password
        } = req.body
        console.log("anshul")
        const admin = new Admin(req.body)
        await admin.save()
        const token = await admin.generateAuthToken()
        res.status(201).send({
            success: true,
            admin,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: error.errmsg
        })
    }
})
module.exports = router;
