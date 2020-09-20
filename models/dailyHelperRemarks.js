  
const mongoose = require('mongoose')

const dailyHelperRemarksSchema = mongoose.Schema({
    apartmentId : {
        type : String,
        required : true
    },
    dailyHelperId : {
        type : String,
        required : true
    },
    societyId : {
        type:  String,
        required: true
    },
    residentId : {
        type: String,
        required:true
    },
    remarkUrl : {
        type: String,
        required:true
    },
    remarkText : {
        type: String,
        required:true
    },
    isApproved : {
        type: Boolean,
    }
})



const DailyHelperRemarks = mongoose.model('dailyHelperRemarks', dailyHelperRemarksSchema)

module.exports = DailyHelperRemarks