const mongoose = require('mongoose')

const apartmentSchema = mongoose.Schema({
    apartment : {
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

const Apartment = mongoose.model('apartment', apartmentSchema)

module.exports = Apartment