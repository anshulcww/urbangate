const mongoose = require('mongoose')

const appartmentSchema = mongoose.Schema({
    appartment : {
        type :  String,
        required : true,
        unique: true
    },
    societyId : {
        type : String,
        required : true
    },
    adminId : {
        type : String,
        required : true
    },
})

const Appartment = mongoose.model('appartment', appartmentSchema)

module.exports = Appartment