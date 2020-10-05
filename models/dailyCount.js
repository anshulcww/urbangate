const mongoose = require('mongoose')

const dailyCountSchema = mongoose.Schema({
    count : [],
})

const DailyCount = mongoose.model('dailyCount', dailyCountSchema)

module.exports = DailyCount