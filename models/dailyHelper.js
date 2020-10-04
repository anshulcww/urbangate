
const mongoose = require('mongoose')

const dailyHelperSchema = mongoose.Schema({
    helperName: {
        type: String,
        required: true
    },
    apartmentIds: [{
        apartmentId: String
    }],
    helperMobileNumber: {
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
    societyId: {
        type: String,
        required: true
    },
    adminId: {
        type: String,
        required: true
    },
    timeSlots: {
        type : Array,
        default: [
            {
                time: "6 AM - 7 AM",
                isAvailable: true
            },
            {
                time: "7 AM - 8 AM",
                isAvailable: true
            },
            {
                time: "8 AM - 9 AM",
                isAvailable: true
            },
            {
                time: "9 AM - 10 AM",
                isAvailable: true
            },
            {
                time: "10 AM - 11 AM",
                isAvailable: true
            },

            {
                time: "11 AM - 12 PM",
                isAvailable: true
            },
            {
                time: "12 PM - 1 PM",
                isAvailable: true
            },
            {
                time: "2 PM - 3 PM",
                isAvailable: true
            },
            {
                time: "3 PM - 4 PM",
                isAvailable: true
            },
            {
                time: "4 PM - 5 PM",
                isAvailable: true
            },
            {
                time: "5 PM - 6 PM",
                isAvailable: true
            },
            {
                time: "6 PM - 7 PM",
                isAvailable: true
            },
            {
                time: "7 PM - 8 PM",
                isAvailable: true
            },
        ]
    },
    helperProfessional : {
        type : String,
        required : true,
        enum : ['maid' , 'cook', 'nanny', 'others']
    }
    
    
})

const DailyHelper = mongoose.model('dailyHelper', dailyHelperSchema)

module.exports = DailyHelper