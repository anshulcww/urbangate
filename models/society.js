  
const mongoose = require('mongoose')

const societySchema = mongoose.Schema({
    societyName : {
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
    }
})

const Society = mongoose.model('society', societySchema)

module.exports = Society