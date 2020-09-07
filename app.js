const express = require('express')
const mongoose = require('mongoose')
const Config = require('./config')
const guard = require('./routes/guard')
const society = require('./routes/society')
const admin = require('./routes/admin')
const multer = require('multer')
var AWS = require('aws-sdk');


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

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public')
    },
    filename: function (req, file, cb) {
        console.log(file.originalname)
        file.originalname = file.originalname.split('.')[0] + (file.originalname.split('.')[1] ? "." + file.originalname.split('.')[1].toLowerCase() : '')
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({
    storage: storage
}).single('file', 10)

app.post('/upload', function (req, res) {
    // console.log(req)
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        req.file.filename = req.file.filename.split('.')[0] + (req.file.filename.split('.')[1] ? "." + req.file.filename.split('.')[1].toLowerCase() : '')
        return res.status(200).send(req.file)
    })
})


const server = app.listen(process.env.PORT || 5000, () => {
    console.log(`server running on port `)
})