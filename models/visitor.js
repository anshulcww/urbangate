  
const mongoose = require('mongoose')

const visitorSchema = mongoose.Schema({
    visitorName : {
        type : String,
        // required : true
    },
    visitorAddress : {
        type : String,
        // required : true
    },
    visitorMobileNumber : {
        type: String,
        required: true,
        unique: true,
        validator: value => {
            if (!validator.isMobilePhone(value)) {
                throw new Error({
                    error: 'invalid mobile number'
                })
            }
        }
    },
    vehicleNo : {
        type : String,
    },
    visitorImageUrl : {
        type :  String
    },
})



const Visitor = mongoose.model('visitor', visitorSchema)

module.exports = Visitor