  
const mongoose = require('mongoose')

const dailyHelperSchema = mongoose.Schema({
    helperName : {
        type :  String,
        required : true
    },
    apartmentIds : [{
        apartmentId: String
    }],
    helperMobileNumber : {
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
    societyId : {
        type : String,
        required : true
    },
    adminId : {
        type : String,
        required : true
    }
})

const DailyHelper = mongoose.model('dailyHelper', dailyHelperSchema)

module.exports = DailyHelper