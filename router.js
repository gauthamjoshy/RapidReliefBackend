const express = require("express")
const {userRegisterController, userLoginController } = require("./controller/userController")
const { orgRegisterController, orgLoginController } = require("./controller/orgController")
const { adminLoginController } = require("./controller/adminController")
const { userReportController } = require("./controller/reportController")
const jwtMiddleware = require("./middlewares/jwtMiddleware")
const multerConfig = require("./middlewares/imageMulterMiddleware")

const router = express.Router()

// user register
router.post("/user-register", userRegisterController)

// org register
router.post("/org-register", orgRegisterController)

// admin login
router.post("/admin-login", adminLoginController)

// user login
router.post("/user-login", userLoginController)

// organization login
router.post("/org-login", orgLoginController)

// user report submit
router.post("/user-report", jwtMiddleware, multerConfig.array("uploadImages", 3), userReportController)

module.exports = router