  
const mongoose = require('mongoose')

const guardSchema = mongoose.Schema({
    adminId : {
        type : String,
        required : true
    },
    guardName : {
        type : String
    },
    address : {
        type : String,
        required : true
    },
    phoneNumber : {
        type : Number,
    }
})

const Guard = mongoose.model('guard', guardSchema)

module.exports = Guard