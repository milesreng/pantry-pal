const jwt = require('jsonwebtoken')

const checkAuth = async (req, res, next) => {
  try {
    const token = req.headers['authorization'].split(' ')[1]
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY)

    req.userData = { userId: decodedToken.userId, email: decodedToken.email }
    next()
  } catch (e) {
    console.log(e)
    return res.status(401).json({ error: 'user authentication failed' })
  }
}

module.exports = checkAuth