const route = require('express').Router()
const {
  userRegister,
  loginAccount,
  checkAccount,
  confirmEmailAccount,
  sendEmailForgorPassword,
  updatePasswordForgot
} = require('../controller/userController')
const { AuthCheckAccount } = require('../middleware/auth')
route.post('/register', userRegister)
route.post('/check', AuthCheckAccount, checkAccount)
route.post('/login', loginAccount)
route.patch('/confirm/:tokenConfirm', confirmEmailAccount)
route.post('/sendForgotkeys', sendEmailForgorPassword)
route.patch('/resetPassword', updatePasswordForgot)
module.exports = route
