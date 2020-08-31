const express = require('express')
const router = express.Router()
const Admin = require('../models/admin')
const Guard = require('../models/guard')
const {adminAuth} = require('../middleware/auth')


// Add Guard
router.post('/addGuard', adminAuth, async (req, res) => {
    try{
        const {
            adminId,
            guardName,
            guardMobileNumber,
            address,
            societyId
        } = req.body

        let guard = new Guard(req.body)
        let pass = Math.floor(1000 + Math.random() * 9000);
        guard.password = pass
        let result = await guard.save()
        // console.log(result)

        res.status(201).send({
            success: true,
            data: result
        })
    }catch(error){
        console.log(error)
        res.status(400).send({
            success: false,
            message: error
        })
    }
})

// Create admin API
router.post('/register', async (req, res) => {
    try{
       const {
        societyId,
        adminName,
        address,
        phoneNumber,
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

    }catch(error){
        console.log(error)
        res.status(400).send({
            success: false,
            message: error.errmsg
        })
    }
}) 
module.exports = router;
