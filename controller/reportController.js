const aireports = require("../model/aiReportModel");
const organizations = require("../model/orgModel");
const userReports = require("../model/userReportModel");
const { analyzeReport } = require("../service/geminiService");
const extractJson = require("../utils/parseAIJson");

exports.userReportController = async (req, res) => {
    console.log(`Inside userReportController`);

    // console.log(req.files);

    const { name, pNum, address, description, location } = req.body
    console.log(name, pNum, address, description, location);

    const userMail = req.payload
    console.log(userMail);

    // 
    var images = []
    req.files.map((item) => images.push(item.filename))
    console.log(images);
    // 

    const BASE_URL = `${req.protocol}://${req.get("host")}`;

    const imageUrls = req.files
        ? req.files.map(file => `${BASE_URL}/uploads/${file.filename}`)
        : [];



    // const images = req.files
    // // console.log(images);
    // const uploadImages = images.map((item) => item.filename)
    // console.log(uploadImages);

    try {
        const existingReport = await userReports.findOne({ userMail, location })
        if (existingReport) {
            res.status(401).json(`You have already submitted one disaster occurence`)
        } else {
            const newReport = new userReports({
                name,
                pNum,
                address,
                description,
                location,
                userMail,
                images: imageUrls
                
            })
            await newReport.save()
            // res.status(200).json(newReport)

            // triggering ai analysis
            setImmediate(async () => {
                try {
                    const AIText = await analyzeReport({
                        name,
                        pNum,
                        address,
                        description,
                        location,
                        userMail,
                        images: imageUrls
                        

                    },
                        req.files
                    )
                    const AIResult = extractJson(AIText)
                    await aireports.create({
                        reportId: newReport._id,
                        name,
                        pNum,
                        address,
                        description,
                        location,
                        userMail,
                        images: imageUrls,
                        ...AIResult
                    })
                    console.log(`AI report saved successfully`);

                } catch (aiError) {
                    console.log(`AI report saving failed due to ${aiError}`);

                }
            })
            res.status(200).json(newReport)
        }
    } catch (error) {
        res.status(500).json(error)
    }

}


// approve report
exports.approveReportController = async (req, res) => {
    console.log(`Inside approveReportController`);

    const {id} = req.params

    const approveReportData = {status : "approved"}

    try{
        const approveReport = await aireports.findByIdAndUpdate({_id: id}, approveReportData, {new: true})
        res.status(200).json(approveReport)

    }catch(error){
        res.status(500).json(error)
    }

}

// assign organization
exports.assignOrgController = async (req, res)=>{
    console.log(`Inside assignOrgController`);

    const {id} = req.params
    const {username} = req.body

    const assignOrgData = {assignedOrganization: username }

    try{
        const assignedOrg = await aireports.findByIdAndUpdate({_id: id}, assignOrgData, {new: true})
        // 
        await organizations.findOneAndUpdate({ username }, { status: "Busy" });
        // 
        res.status(200).json(assignedOrg)

    }catch(error){
        res.status(500).json(error)
    }
    
}

// reject a report
exports.rejectReportController = async (req, res)=>{
    console.log(`Inside rejectReportController`);

    const {id} = req.params
    const {rejectionReason} = req.body

    try{
        const rejectedReport = await aireports.findByIdAndUpdate({_id: id}, {status: "rejected", rejectionReason: rejectionReason}, {new: true})
        res.status(200).json(rejectedReport)

    }catch(error){
        res.status(500).json(error)
        console.log(error);
        
    }
    
}
