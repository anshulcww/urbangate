const jwt = require('jsonwebtoken')

const Guard = require('../models/guard')
const Admin = require('../models/admin')
const Resident = require('../models/resident')

const Config = require('../config')

const residentAuth = async (req, res, next) => {
    try {
        // console.log(req.baseUrl)
        const token = req.header('Authorization').replace('Bearer ', '')
        // console.log('Token:', token)
        const data = jwt.verify(token, Config.JWT_KEY)
        const resident = await Resident.findOne({
            _id: data._id,
            'tokens.token': token
        })
        if (!resident) {
            throw new Error({
                error: 'invalid user'
            })
        }
        req.resident = resident
        req.token = token
        next()
    } catch (error) {
        console.log(error)
        res.status(401).send({
            error: 'not authorized'
        })
    }
}


const adminAuth = async (req, res, next) => {
    try {
        // console.log(req.baseUrl)
        const token = req.header('Authorization').replace('Bearer ', '')
        // console.log('Token:', token)
        const data = jwt.verify(token, Config.JWT_KEY)
        const admin = await Admin.findOne({
            _id: data._id,
            'tokens.token': token
        })
        if (!admin) {
            throw new Error({
                error: 'invalid user'
            })
        }
        req.admin = admin
        req.token = token
        next()
    } catch (error) {
        console.log(error)
        res.status(401).send({
            error: 'not authorized',
        })
    }
}


const guardAuth = async (req, res, next) => {
    try {
        // console.log(req.baseUrl)
        const token = req.header('Authorization').replace('Bearer ', '')
        // console.log('Token:', token)
        const data = jwt.verify(token, Config.JWT_KEY)
        const guard = await Guard.findOne({
            _id: data._id,
            'tokens.token': token
        })
        if (!guard) {
            throw new Error({
                error: 'invalid user'
            })
        }
        req.guard = guard
        req.token = token
        next()
    } catch (error) {
        console.log(error)
        res.status(401).send({
            error: 'not authorized'
        })
    }
}

module.exports = {guardAuth, adminAuth, residentAuth}