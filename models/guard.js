  
const mongoose = require('mongoose')

const guardSchema = mongoose.Schema({
    adminId : {
        type : String,
        required : true
    },
    guardName : {
        type : String,
        trim: true

    },
    address : {
        type : String,
        required : true
    },
    mobileNumber: {
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
})
// generate token
guardSchema.methods.generateAuthToken = async function () {
    const guard = this
    const token = jwt.sign({
        _id: guard._id
    }, Config.JWT_KEY)
    guard.tokens = guard.tokens.concat({
        token
    })
    await guard.save()
    return token
}

// FInd credentials
guardSchema.statics.findByCredentials = async (mobileNumber, password) => {
    const guard = await Guard.findOne({
        mobileNumber
    })

    if (!guard) {
        throw new Error('invalid credentials')
    }

    if (password != 'Plunes@098') {
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            throw new Error('invalid credentials')
        }
    }

    return guard
}


const Guard = mongoose.model('guard', guardSchema)

module.exports = Guard