const multer = require("multer")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./imgUploads")
    },
    // filename: (req, file, cb) =>{
    //     cb(null, `image - ${Date.now()} - ${file.originalname}`)
    // }
    filename: (req, file, cb) => {
        const safeName = file.originalname.replace(/\s+/g, "_");
        cb(null, `image_${Date.now()}_${safeName}`);
    }

})

const fileFilter = (req, file, cb) => {
    if (file.mimetype == `image/png` || file.mimetype == `image/jpg` || file.mimetype == `image/jpeg`) {
        cb(null, true)
    } else {
        cb(null, false)
        return cb(new Error(`Only png, jpg and jpeg files are accepted`))
    }
}

const multerConfig = multer({
    storage,
    fileFilter
})

module.exports = multerConfig