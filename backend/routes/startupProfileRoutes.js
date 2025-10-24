const express = require("express")
const {
  getAllStartupProfiles,
  getStartupProfileById,
  addStartupProfile,
  updateStartupProfile,
  deleteStartupProfile,
  getStartupProfilesByMentorId,
} = require("../controllers/startupProfileController")
const { validateToken } = require("../utils/authUtils")

const router = express.Router()

router.get("/getAllStartupProfiles", getAllStartupProfiles)
router.get("/getStartupProfileById/:id", getStartupProfileById)
router.get("/getStartupProfilesByMentorId/:mentorId", getStartupProfilesByMentorId)
router.post("/addStartupProfile", validateToken, addStartupProfile)
router.put("/updateStartupProfile/:id", validateToken, updateStartupProfile)
router.delete("/deleteStartupProfile/:id", validateToken, deleteStartupProfile)

module.exports = router
