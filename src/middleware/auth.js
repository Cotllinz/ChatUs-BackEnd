const jwt = require('jsonwebtoken')
const helper = require('../helper/response')
require('dotenv').config()
module.exports = {
  AuthCheckAccount: (req, res, next) => {
    let token = req.headers.authorization
    if (token) {
      token = token.split(' ')[1]
      jwt.verify(token, process.env.code_secretJWT, (err, result) => {
        if (
          (err && err.name === 'JsonWebTokenError') ||
          (err && err.name === 'TokenExpiredError')
        ) {
          return helper.response(
            res,
            403,
            'Login again your token expired',
            err.message
          )
        } else {
          req.decodeToken = result
          if (req.decodeToken.statusUser === 'Active') {
            next()
          }
        }
      })
    } else {
      return helper.response(res, 403, 'Please Login First !')
    }
  }
}
