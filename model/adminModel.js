const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        default: "Rapid Relief Admin"
    }, email: {
        type: String,
        required: true
    }, password: {
        type: String,
        required: true
    },role: {
        type: String,
        default: "admin"
    }
})
const admins = mongoose.model("admins", adminSchema)
module.exports = admins
