const express = require('express')
const router = express.Router()
const Society = require('../models/society')


// Get all societies
router.get('/getAllSocieties', async (req, res) => {
    try{
        let societies = await Society.find()
        res.status(201).send({
            success : true,
            data : societies
        })
    }catch(err){
        console.log(err);
        res.status(400).send({
            success : false,
            error : err
        })
    }
})

// Create society
router.post('/addSociety',async (req, res) => {
    try{
        const {
            societyName,
            address,
            societyMobileNumber,
            email
        } = req.body

        let society = new Society(req.body)
        let result = await society.save()
        console.log(result)
        res.status(201).send({
            success : true,
            data : result
        })
    }catch(error){
        console.log(error)
        res.status(400).send({
            success : false,
        })
    }
})


// Get details of society
router.get('/getSociety/:phoneNumber', async (req, res) => {
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
module.exports = router;
