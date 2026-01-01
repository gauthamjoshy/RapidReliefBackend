const admins = require("../model/adminModel");
const aireports = require("../model/aiReportModel");
const organizations = require("../model/orgModel");
const users = require("../model/userModel");

exports.adminLoginController = async (req, res)=>{
    console.log(`Inside adminLoginController`);
    const {email, password} = req.body
    console.log(email, password);
    
    try{
        const existingAdmin = await admins.findOne({email})
        if(existingAdmin){
            if(existingAdmin.email == email && existingAdmin.password == password){
                res.status(200).json(existingAdmin)
            }else{
                res.status(404).json(`Invalid credentials`)
            }
        }else{
            res.status(401).json(`User not found`)
        }

    }catch (error){
        res.status(500).json(error)
    }
}

// get all reports
exports.getAllAIReports = async (req, res) => {
  try {
    const reports = await aireports.find();
    res.status(200).json(reports);

  } catch (error) {
    console.error(error);
    res.status(500).json("Failed to fetch AI reports");
  }
};

// get all users
exports.getAllUserController = async (req, res)=>{
    console.log(`Inside getAllUserController`);

    try{
        const allUsers = await users.find()
        res.status(200).json(allUsers)

    }catch (error) {
    console.error(error);
    res.status(500).json("Failed to fetch users");
  }
    
}

// get all organization
exports.getAllOrgController = async (req, res)=>{
    console.log(`Inside getAllOrgController`);

    try{
        const allOrg = await organizations.find()
        res.status(200).json(allOrg)

    }catch (error) {
    console.error(error);
    res.status(500).json("Failed to fetch allOrg");
  }
    
}