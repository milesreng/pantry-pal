const jwt = require('jsonwebtoken')

const catchError = (err, res) => {
  if (err instanceof jwt.TokenExpiredError) {
    return res.status(401).send({ message: 'Token expired', error: err.name })
  }

  return res.status(401).send({ message: 'Unauthorized' })
}

const checkAuth = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token']

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) catchError(err, res)
      
      req.userData = { userId: decoded.userId, email: decoded.email }
      next()
    })

  } catch (e) {
    console.log(e)
    return res.status(401).json({ error: 'user authentication failed' })
  }
}

module.exports = checkAuth