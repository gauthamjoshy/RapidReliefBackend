const mongoose = require("mongoose")

const userReportSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    pNum: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
    status: {
        type: String,
        default: "pending"
    },
    userMail: {
        type: String,
        required: true
    }
})

const userReports = mongoose.model("userreports", userReportSchema)
module.exports = userReports