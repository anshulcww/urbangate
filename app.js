const express = require('express')
const mongoose = require('mongoose')
const Config = require('./config')
const guard = require('./routes/guard')
const society = require('./routes/society')
const admin = require('./routes/admin')
const multer = require('multer')
const multerS3 = require("multer-s3");

var AWS = require('aws-sdk');

var accessKeyId = process.env.AWS_ACCESS_KEY || "AKIAJDYYMNPANZF4JLXQ";
var secretAccessKey = process.env.AWS_SECRET_KEY || "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";

AWS.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
});

var s3 = new AWS.S3();


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
    if (err) {
        console.log(err)
    } else {
        console.log('database created')

    }
})

const upload = multer({
    // fileFilter,
    storage: multerS3({
      acl: "public-read",
      s3,
      bucket: "profile-image-urbangate",
      metadata: function (req, file, cb) {
        cb(null, { fieldName: "TESTING_METADATA" });
      },
      key: function (req, file, cb) {
        cb(null, Date.now().toString());
      },
    }),
  });



app.post('/upload', upload.single('file'), function (req, res) {
    // console.log(req.file)
    if (req.file !== undefined) { // `image` is the field name from your form
        res.status(201).send({
            success : true,
            imageUrl : req.file.location
        }); // success
    } else {
        res.send("error, no file chosen");
    }
});

const server = app.listen(process.env.PORT || 5000, () => {
    console.log(`server running on port `)
})