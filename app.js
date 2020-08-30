const express = require('express')
const mongoose = require('mongoose')
const Config = require('./config')
const guard = require('./routes/guard')
const Society = require('./models/society')
const cors = require('cors')

const app = express()

app.use(express.json());
app.use(cors())

// app.use('/guard', guard)


//Test Apiss
app.get('/', (req, res) => res.send('Server is running .... '))


// Create society
app.post('/createSociety',async (req, res) => {
    try{
        const {
            societyName,
            address,
            phoneNumber,
            email
        } = req.body

        let society = new Society(req.body)
        let result = await society.save()
        console.log(result)
        res.status(201).send({
            success : true,
            data : result
        })
    }catch(error){
        console.log(error)
        res.status(400).send({
            success : false,
        })
    }
})

// Get details of society
app.get('/getSociety/:phoneNumber', async (req, res) => {
    try{
        let society = await Society.find({
            phoneNumber : req.params.phoneNumber
        })
        res.status(201).send({
            success :  true,
            data :  society
        })
    }catch(err){
        console.log(err)
        res.status(400).send({
            success : false,
            err : err
        })
    }
})


//connecting Mongodb


mongoose.connect(Config.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, (err, doc) => {
    if(err) {
        console.log(err)
    }else{
        console.log('database created')
        
    }
})

const server = app.listen(process.env.PORT || 5000, () => {
    console.log(`server running on port `)
})