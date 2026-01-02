const express = require("express")
const {userRegisterController, userLoginController, getEachUserReportController } = require("./controller/userController")
const { orgRegisterController, orgLoginController } = require("./controller/orgController")
const { adminLoginController, getAllAIReports, getAllUserController, getAllOrgController } = require("./controller/adminController")
const { userReportController, approveReportController, assignOrgController } = require("./controller/reportController")
const jwtMiddleware = require("./middlewares/jwtMiddleware")
const multerConfig = require("./middlewares/imageMulterMiddleware")
const { testAIController } = require("./controller/testAIController")


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

// user report submit(raw report)
router.post("/user-report", jwtMiddleware, multerConfig.array("uploadImages", 3), userReportController)

// ai analysis report()
router.post("/test-result", jwtMiddleware, multerConfig.array("uploadImages", 3), testAIController  )

// get all ai reports admin
router.get("/get-all-reports-admin", getAllAIReports)

// get all users
router.get("/get-all-users", getAllUserController)

// get all users
router.get("/get-all-org", getAllOrgController)

// get each user report
router.get("/get-eachUser-report",jwtMiddleware, getEachUserReportController)

// update report
router.put("/approve-report/:id", approveReportController)

// assign org
router.put("/assign-org/:id", assignOrgController)

module.exports = router