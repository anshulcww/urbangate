const mongoose = require('mongoose')

const apartmentSchema = mongoose.Schema({
    building : {
        type :  String,
        required : true,
    },
    flatNumber : {
        type: String,
        required : true
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

const Apartment = mongoose.model('apartment', apartmentSchema)

module.exports = Apartment