const User = require("../models/User")
const { generateToken } = require("../utils/authUtils")

// Login user
const getUserByEmailAndPassword = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email, password })

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    const token = generateToken(user._id)
    res.status(200).json({
      userName: user.userName,
      role: user.role,
      token,
      userId: user._id,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Register user
const addUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body)
    res.status(200).json({ message: "User registered successfully", user: newUser })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { getUserByEmailAndPassword, addUser }
