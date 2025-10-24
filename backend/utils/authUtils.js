const jwt = require("jsonwebtoken")

const SECRET_KEY = process.env.JWT_SECRET || "asdfghjkl"

const generateToken = (userId) => {
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: "1h" })
}

const validateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]

  if (!token) {
    return res.status(400).json({ message: "Authentication failed" })
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY)
    req.userId = decoded.userId
    next()
  } catch (error) {
    return res.status(400).json({ message: "Authentication failed" })
  }
}

module.exports = { generateToken, validateToken }
