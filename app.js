const express = require('express')
const mongoose = require('mongoose')
const Config = require('./config')
const guard = require('./routes/guard')
const society = require('./routes/society')
const admin = require('./routes/admin')


const cors = require('cors')

const app = express()

app.use(express.json());
app.use(cors())

app.use('/guard', guard)
app.use('/society', society)
app.use('/admin', admin)

//Test Apiss
app.get('/', (req, res) => res.send('Server is running .... '))





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