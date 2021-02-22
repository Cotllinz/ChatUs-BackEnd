const route = require('express').Router()
const {
  userRegister,
  loginAccount,
  checkAccount,
  confirmEmailAccount,
  sendEmailForgorPassword,
  updatePasswordForgot,
  updatePassword,
  updatePhonenumber,
  updateUser,
  updateLocation,
  logoutUser
} = require('../controller/userController')
const multerImage = require('../middleware/multerUser')
const { AuthCheckAccount } = require('../middleware/auth')
route.post('/register', userRegister)
route.post('/check', AuthCheckAccount, checkAccount)
route.post('/login', loginAccount)
route.patch('/confirm/:tokenConfirm', confirmEmailAccount)
route.post('/sendForgotkeys', sendEmailForgorPassword)
route.patch('/resetPassword', updatePasswordForgot)
route.patch('/updatePass/:id', updatePassword)
route.patch('/updatePhone/:id', updatePhonenumber)
route.patch('/logout/:id', logoutUser)
route.patch('/updateLocation/:userEmail', updateLocation)
route.patch('/updateUser/:userEmail', multerImage, updateUser)
module.exports = route
