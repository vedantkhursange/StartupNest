const express = require("express")
const {
  getAllStartupSubmissions,
  getSubmissionsByUserId,
  getStartupSubmissionById,
  addStartupSubmission,
  updateStartupSubmission,
  deleteStartupSubmission,
} = require("../controllers/startupSubmissionController")
const { validateToken } = require("../utils/authUtils")

const router = express.Router()

router.post("/getAllStartupSubmissions", getAllStartupSubmissions)
router.get("/getSubmissionsByUserId/:userId", getSubmissionsByUserId)
router.get("/getStartupSubmissionById/:id", getStartupSubmissionById)
router.post("/addStartupSubmission", validateToken, addStartupSubmission)
router.put("/updateStartupSubmission/:id", validateToken, updateStartupSubmission)
router.delete("/deleteStartupSubmission/:id", validateToken, deleteStartupSubmission)

module.exports = router
