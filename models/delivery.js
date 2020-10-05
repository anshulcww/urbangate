  
const mongoose = require('mongoose')



const deliverySchema = mongoose.Schema({
    societyId : {
        type : String,
        required : true
    },
    guardId : {
        type :  String,
        required : true
    },
    deliveryName : {
        type : String,
        required : true
    },
    deliveryMobileNumber : {
        type: String,
        required: true,
        validator: value => {
            if (!validator.isMobilePhone(value)) {
                throw new Error({
                    error: 'invalid mobile number'
                })
            }
        }
    },
    deliveryType : {
        type : String,
        required : true,
    },
    apartmentId: {
        type: String,
        required: true
    },
    deliveryImageUrls:[{
        deliveryImageUrl : String
    }],
    status: {
        type: String,
        enum : ['Accepted', 'Rejected', 'Gated']
    }
})

const Delivery = mongoose.model('delivery', deliverySchema)

module.exports = Delivery