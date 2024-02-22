const jwt = require('jsonwebtoken')

const catchError = (err, res) => {
  if (err instanceof jwt.TokenExpiredError) {
    return res.status(401).json({ message: 'Token expired', error: err.name })
  }

  return res.status(401).json({ message: 'Unauthorized' })
}

const checkAuth = async (req, res, next) => {
  const token = req.headers['x-access-token']

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) catchError(err, res)
      
    req.userData = { userId: decoded.userId, email: decoded.email }
    next()
  })
}

module.exports = checkAuth