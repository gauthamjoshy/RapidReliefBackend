const admins = require("../model/adminModel");

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