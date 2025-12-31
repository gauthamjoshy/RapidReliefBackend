const userReports = require("../model/userReportModel");

exports.userReportController = async (req, res) => {
    console.log(`Inside userReportController`);

    // console.log(req.files);

    const { name, pNum, address, description, location } = req.body
    console.log(name, pNum, address, description, location);

    const userMail = req.payload
    console.log(userMail);

    // 
    var images = []
    req.files.map((item)=>images.push(item.filename))
    console.log(images);
    // 

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
                images
            })
            await newReport.save()
            res.status(200).json(newReport)
        }
    } catch (error) {
        res.status(500).json(error)
    }

}