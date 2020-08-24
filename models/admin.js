  
const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    societyId : {
        type : String,
        required : true
    },
    adminName : {
        type :  String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    phoneNumber : {
        type : Number,
        required : true
    },
    email : {
        type : String,
        required : true
    }
})

const Admin = mongoose.model('admin', adminSchema)

module.exports = Admin