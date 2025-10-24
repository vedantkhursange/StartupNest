const express = require("express")
const { getUserByEmailAndPassword, addUser } = require("../controllers/userController")

const router = express.Router()

router.post("/login", getUserByEmailAndPassword)
router.post("/signup", addUser)

module.exports = router
