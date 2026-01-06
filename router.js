const express = require("express")
const {userRegisterController, userLoginController, getEachUserReportController, getPendingReportController } = require("./controller/userController")
const { orgRegisterController, orgLoginController, getAssignedReportController, acceptReportController, getAllReportOrgController, completeReportController, updateOrgProfileController } = require("./controller/orgController")
const { adminLoginController, getAllAIReports, getAllUserController, getAllOrgController } = require("./controller/adminController")
const { userReportController, approveReportController, assignOrgController } = require("./controller/reportController")
const multerConfig = require("./middlewares/imageMulterMiddleware")
const { testAIController } = require("./controller/testAIController")
const userJwtMiddleware = require("./middlewares/userJwtMiddleware")
const OrgJwtMiddleware = require("./middlewares/OrgJwtMiddleware")


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
router.post("/user-report", userJwtMiddleware, multerConfig.array("uploadImages", 3), userReportController)

// ai analysis report()
router.post("/test-result", userJwtMiddleware, multerConfig.array("uploadImages", 3), testAIController  )

// get all ai reports admin
router.get("/get-all-reports-admin", getAllAIReports)

// get all users
router.get("/get-all-users", getAllUserController)

// get all users
router.get("/get-all-org", getAllOrgController)

// get each user report
router.get("/get-eachUser-report", userJwtMiddleware, getEachUserReportController)

// get pending user report
router.get("/get-pending-user-report", userJwtMiddleware, getPendingReportController)

// update report
router.put("/approve-report/:id", approveReportController)

// assign org
router.put("/assign-org/:id", assignOrgController)

// get assigned report
router.get("/get-assigned-report", OrgJwtMiddleware, getAssignedReportController)

// accept report at org
router.post("/accept-assigned-report/:id", OrgJwtMiddleware, acceptReportController)

// get all assigned report
router.get("/get-all-assigned-reports", OrgJwtMiddleware, getAllReportOrgController)

// complete report
router.put("/complete-report/:id", OrgJwtMiddleware, completeReportController)

router.put("/update-org-profile", OrgJwtMiddleware, updateOrgProfileController)


module.exports = router