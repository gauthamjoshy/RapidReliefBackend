const express = require("express")
const {userRegisterController, userLoginController, getEachUserReportController, getPendingReportController, reportUserIssueController } = require("./controller/userController")
const { orgRegisterController, orgLoginController, getAssignedReportController, acceptReportController, getAllReportOrgController, completeReportController, updateOrgProfileController, reportOrgIssueController } = require("./controller/orgController")
const { adminLoginController, getAllAIReports, getAllUserController, getAllOrgController, getRejectedReportAdminController, deleteUserController, deleteOrgController, replyToUserController, replyToOrgController } = require("./controller/adminController")
const { userReportController, approveReportController, assignOrgController, rejectReportController } = require("./controller/reportController")
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

// update org profile
router.put("/update-org-profile", OrgJwtMiddleware, updateOrgProfileController)

// reject report
router.put("/reject-report/:id", rejectReportController)

// get rejected reports at admin
router.get("/get-rejected-reports", getRejectedReportAdminController)

// delete user
router.delete("/delete-user/:id", deleteUserController)

// delete user
router.delete("/delete-org/:id", deleteOrgController)

// report org issue
router.put("/report-org-issue/:id", OrgJwtMiddleware, reportOrgIssueController)

// report user issue
router.put("/report-user-issue/:id", userJwtMiddleware, reportUserIssueController)

// reply to user
router.put("/reply-to-user/:id", replyToUserController)

// reply to org
router.put("/reply-to-org/:id", replyToOrgController)




module.exports = router