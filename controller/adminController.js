const admins = require("../model/adminModel");
const aireports = require("../model/aiReportModel");
const organizations = require("../model/orgModel");
const users = require("../model/userModel");

exports.adminLoginController = async (req, res) => {
  console.log(`Inside adminLoginController`);
  const { email, password } = req.body
  console.log(email, password);

  try {
    const existingAdmin = await admins.findOne({ email })
    if (existingAdmin) {
      if (existingAdmin.email == email && existingAdmin.password == password) {
        res.status(200).json(existingAdmin)
      } else {
        res.status(404).json(`Invalid credentials`)
      }
    } else {
      res.status(401).json(`User not found`)
    }

  } catch (error) {
    res.status(500).json(error)
  }
}

// get all reports
exports.getAllAIReports = async (req, res) => {
  try {
    const reports = await aireports.find().sort({ updatedAt: -1 });
    res.status(200).json(reports);

  } catch (error) {
    console.error(error);
    res.status(500).json("Failed to fetch AI reports");
  }
};

// get all users
exports.getAllUserController = async (req, res) => {
  console.log(`Inside getAllUserController`);

  try {
    const allUsers = await users.find()
    res.status(200).json(allUsers)

  } catch (error) {
    console.error(error);
    res.status(500).json("Failed to fetch users");
  }

}

// get all organization
exports.getAllOrgController = async (req, res) => {
  console.log(`Inside getAllOrgController`);

  try {
    const allOrg = await organizations.find()
    res.status(200).json(allOrg)

  } catch (error) {
    console.error(error);
    res.status(500).json("Failed to fetch allOrg");
  }

}

// get rejected reports admin
exports.getRejectedReportAdminController = async (req, res) => {
  console.log(`Inside getRejectedReportAdminController`);

  try {
    const rejectedreports = await aireports.find({status: "rejected"})
    res.status(200).json(rejectedreports)

  } catch (error) {
    console.error(error);
    res.status(500).json("Failed to fetch allOrg");
  }

}

// delete users
exports.deleteUserController = async (req, res)=>{
  console.log(`Inside deleteUserController`);

  const {id} = req.params

  try{
    const deletedUser = await users.findByIdAndDelete({_id: id})
    res.status(200).json({
      message: `User deleted successfully`,
      data: deletedUser
    })

  }catch (error) {
    console.error(error);
    res.status(500).json("Failed to delete users");
  }
  
}

// delete org
exports.deleteOrgController = async (req, res)=>{
  console.log(`Inside deleteOrgController`);

  const {id} = req.params

  try{
    const deletedUser = await organizations.findByIdAndDelete({_id: id})
    res.status(200).json({
      message: `Organization deleted successfully`,
      data: deletedUser
    })

  }catch (error) {
    console.error(error);
    res.status(500).json("Failed to de;ete Organization");
  }
  
}

// reply to user
exports.replyToUserController = async (req, res)=>{
    console.log(`Inside replyToUserController`);

    const {id} = req.params
    const {adminToUserMessage} = req.body
    
    try{
        const userReply = await aireports.findByIdAndUpdate({_id: id}, {adminToUserMessage}, {new: true})
        res.status(200).json(userReply)

    }catch(error){
        res.status(500).json(error)
        console.log(error);
        
    }
}

// reply to org
exports.replyToOrgController = async (req, res)=>{
    console.log(`Inside replyToOrgController`);

    const {id} = req.params
    const {adminToOrgMessage} = req.body
    
    try{
        const orgReply = await aireports.findByIdAndUpdate({_id: id}, {adminToOrgMessage}, {new: true})
        res.status(200).json(orgReply)

    }catch(error){
        res.status(500).json(error)
        console.log(error);
        
    }
}