const mongoose = require("mongoose")

const AIReportSchema = new mongoose.Schema({
    reportId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userreports",
        required: true
    },
    location: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    pNum: {
        type: String,
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
    status: {
        type: String,
        default: "pending"
    },
    assignedOrganization: {
        type: String,
        default: ""
    },
    incidentOverview: {
        type: String,
        required: true
    },
    severity: {
        type: String,
        enum: ["Low", "Medium", "High"],
        required: true
    },
    keywords: {
        type: [String],
        required: true
    },
    location: {
        type: String,
        required: true
    },
    dateAndTime: {
        type: String,
    },
    aiAnalysisAndRecommendations: {
        type: String,
        required: true
    },
    userMail: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    rejectionReason: {
        type: String,
        default: null
    },
    orgIssue: {
        type: String,
        default: null
    },
    userIssue: {
        type: String,
        default: null
    },
    adminToOrgMessage:  {
        type: String,
        default: null
    },
    adminToUserMessage:  {
        type: String,
        default: null
    },

},
    { timestamps: true }

)

const aireports = mongoose.model("aireports", AIReportSchema)
module.exports = aireports