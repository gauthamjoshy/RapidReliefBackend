const mongoose = require("mongoose")

const orgSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    volunteerCount: {
        type: Number,
        required: true
    },
    medicalTeamCount: {
        type: Number,
        required: true
    },
    vehicleCount: {
        type: Number,
        required: true
    },
    foodAvailability: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "organization"
    },status: {
        type: String,
        default: ""
    }

})

const organizations = mongoose.model("organizations", orgSchema)
module.exports = organizations