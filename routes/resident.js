const express = require('express')
const router = express.Router()
const Admin = require('../models/admin')
const Guard = require('../models/guard')
const {residentAuth} = require('../middleware/auth')

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