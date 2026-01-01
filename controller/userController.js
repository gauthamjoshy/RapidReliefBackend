const aireports = require("../model/aiReportModel");
const users = require("../model/userModel");
const jwt = require("jsonwebtoken")

// register
exports.userRegisterController = async (req, res) => {
    console.log(`Inside userRegisterController`);
    const { username, email, password } = req.body
    console.log(username, email, password);

    try {
        const existingUser = await users.findOne({ username })
        if (existingUser) {
            res.status(404).json(`User Already exists...!`)

        } else {
            const newUser = new users({
                username,
                email,
                password
            })
            await newUser.save()
            res.status(200).json(newUser)

        }
    } catch (error) {
        res.status(500).json(error)
    }

}


// user login
exports.userLoginController = async (req, res) => {
    console.log(`Inside userLoginController`);
    const { email, password } = req.body
    console.log(email, password);

    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            if (existingUser.password == password) {
                const token = jwt.sign({ userMail: existingUser.email }, process.env.JWTSecreteKey)
                res.status(200).json({ existingUser, token })
            } else {
                res.status(401).json(`Invalid credentials!`)
            }
        } else {
            res.status(404).json(`User not found...please register!`)
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

// get a report at user
exports.getEachUserReportController = async (req, res) => {
    console.log(`Inside getEachUserReport`);

    const userMail = req.payload
    console.log(userMail);

    try{
        const eachUserReport = await aireports.find({userMail:userMail})
        if(eachUserReport.length > 0){
            res.status(200).json(eachUserReport)
        }else{
            res.status(404).json(`No reports submitted yet`)
        }

    }catch(error) {
        res.status(500).json(error)
    }

}
