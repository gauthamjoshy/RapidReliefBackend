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
                const token = jwt.sign({orgMail: existingOrganization.email}, process.env.JWTSecreteKey)
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

    const username = req.payload
    
    try{
        const assignedReport = await aireports.find({status: "approved", assignedOrganization: username})
        res.status(200).json(assignedReport)

    }catch(error){
        res.status(500).json(error)
    }
}