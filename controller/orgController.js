const aireports = require("../model/aiReportModel");
const organizations = require("../model/orgModel");
const jwt = require("jsonwebtoken")

// register
exports.orgRegisterController = async (req, res)=>{
    console.log(`Inside orgRegisterController`);
    const {username, email, password, volunteerCount, medicalTeamCount, vehicleCount, foodAvailability, about} = req.body
    console.log(username, email, password, volunteerCount, medicalTeamCount, vehicleCount, foodAvailability, about);
    
    try{
        const existingOrganization = await organizations.findOne({username})
        if(existingOrganization){
            res.status(404).json(`Organization already exists...!`)
        }else{
            const newOrganization = new organizations({
                username,
                email,
                password,
                volunteerCount,
                medicalTeamCount,
                vehicleCount,
                foodAvailability,
                about
            })
            await newOrganization.save()
            res.status(200).json(newOrganization)
        }

    }catch (error){
        req.status(500).json(error)
    }

}

// org login
exports.orgLoginController = async (req, res)=>{
    console.log(`Inside orgLoginController`);
    const {email, password} = req.body

    try{
        const existingOrganization = await organizations.findOne({email})
        if(existingOrganization){
            if(existingOrganization.password == password){
                const token = jwt.sign({orgMail: existingOrganization.email, orgName: existingOrganization.username}, process.env.JWTSecreteKey)
                res.status(200).json({existingOrganization, token})
            }else{
                res.status(404).json(`Inavlid credentials...!`)
            }
        }else{
            res.status(401).json(`Organization not found...please register!`)
        }

    }catch (error){
        req.status(500).json(error)
    }
}

// get assigned report
exports.getAssignedReportController = async (req, res)=>{
    console.log(`Inside getAssignedReportController`);

    const {orgName} = req.payload
    
    try{
        const assignedReport = await aireports.find({status: "approved", assignedOrganization: orgName})
        res.status(200).json(assignedReport)

    }catch(error){
        res.status(500).json(error)
    }
}

// accept report
exports.acceptReportController = async (req, res)=>{
    console.log(`Inside acceptReportController`);

    const {id} = req.params

    const updateStatus = {status: "Accepted"}

    try{
        const accpetReport = await aireports.findByIdAndUpdate({_id: id}, updateStatus, {new:true})
        res.status(200).json(accpetReport)

    }catch(error){
        res.status(500).json(error)
    }
    
}

// get all reports for each organization
exports.getAllReportOrgController = async (req, res)=>{
    console.log(`Inside getAllReportOrgController`);
    
    const {orgName} = req.payload
    
    try{
        const assignedReport = await aireports.find({assignedOrganization: orgName})
        res.status(200).json(assignedReport)

    }catch(error){
        res.status(500).json(error)
    }
    
}

// complete task
exports.completeReportController = async (req, res)=>{
    console.log(`Inside completeReportController`);

    const {id} = req.params
    const updateStatus = {status: "completed"}

    try{
        const completedReport = await aireports.findByIdAndUpdate({_id: id}, updateStatus, {new: true})
        // 
        await organizations.findOneAndUpdate({ username: completedReport.assignedOrganization },{ status: "Available" });
        // 
        res.status(200).json(completedReport)

    }catch(error){
        res.status(500).json(error)
    }
    
}

// update profile
exports.updateOrgProfileController = async (req, res)=>{
    console.log(`Inside updateOrgProfileController`);

    const {username, password, volunteerCount, medicalTeamCount, vehicleCount, foodAvailability, about, status} = req.body
    console.log(username, password, volunteerCount, medicalTeamCount, vehicleCount, foodAvailability, about, status);

    const {orgMail} = req.payload

    try{
        const updateOrgProfile = await organizations.findOneAndUpdate({email: orgMail}, {username, password, volunteerCount, medicalTeamCount, vehicleCount, foodAvailability, about, status}, {new: true})
        res.status(200).json(updateOrgProfile)
        
    }catch(error){
        res.status(500).json(error)
    }
    
}