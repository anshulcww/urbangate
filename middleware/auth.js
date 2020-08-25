const jwt = require('jsonwebtoken')

const Guard = require('../models/guard')
const Config = require('../config')

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
        if (!user) {
            throw new Error({
                error: 'invalid user'
            })
        }
        req.guard = guard
        req.token = token
        next()
    } catch (error) {
        res.status(401).send({
            error: 'not authorized'
        })
    }
}

module.exports = guardAuth