const helper = require('../helper/response')
const {
  userRegisterModel,
  getUserAccountModel,
  getUserAccountbytToken,
  updateStatusUser,
  updateForgotToken,
  getUserAccountbytTokenForgot,
  updatePasswordForgot,
  updatePassword,
  updatePhonenumb,
  updateUser,
  userHaslogin,
  userHaslogout
} = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const fs = require('fs')
require('dotenv').config()
module.exports = {
  userRegister: async (req, res) => {
    try {
      const { userName, userPassword, userEmail } = req.body
      const checkEmail = await getUserAccountModel(userEmail)
      if ((userName, userPassword, userEmail)) {
        if (checkEmail.length >= 1) {
          return helper.response(
            res,
            400,
            `Invalid Register ${userEmail}, Your email has already been registered`
          )
        } else {
          const salt = bcrypt.genSaltSync(10)
          const ecryptPass = bcrypt.hashSync(userPassword, salt)
          const setData = {
            username: userName,
            user_email: userEmail,
            password: ecryptPass,
            token_confirmemail: require('crypto')
              .randomBytes(15)
              .toString('hex'),
            create_at: new Date()
          }
          const result = await userRegisterModel(setData)
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            secure: false,
            auth: {
              user: process.env.email,
              pass: process.env.emailpassword
            }
          })
          const mailOPtion = {
            from: `"Chat Us "${process.env.email}`,
            to: `${userEmail}`,
            subject: `Hello ${userName}, I'm from ChatUs`,
            html: `<h2>Welcome at ChatUs before you chatting with your friend Please Activation  Your Account First on this Button</h2>
                  <p>Click This Link For Activation your account</p>
                  <a href ="https://chatuss.netlify.app/confirm_email/${result.token_confirmemail}">Activation Email</a>`
          }
          transporter.sendMail(mailOPtion, (err, result) => {
            if (err) {
              return helper.response(res, 400, 'Error Send Email', err)
            } else {
              return helper.response(res, 200, 'Success Send Email', result)
            }
          })
          return helper.response(
            res,
            200,
            `Registered Account ${userName} Successfully :)`,
            result
          )
        }
      } else {
        return helper.response(
          res,
          400,
          'Input username, email and password cant be empty !!! please check again'
        )
      }
    } catch (err) {
      return helper.response(res, 400, 'Bad Request', err)
    }
  },
  loginAccount: async (req, res) => {
    try {
      const { userEmail, userPassword } = req.body
      const checkEmail = await getUserAccountModel(userEmail)
      if ((userEmail, userPassword)) {
        if (checkEmail.length > 0) {
          if (checkEmail[0].status_user === 'Active') {
            const checkPassword = bcrypt.compareSync(
              userPassword,
              checkEmail[0].password
            )
            if (checkPassword) {
              const {
                id_user: userId,
                username: userName,
                user_email: userEmail,
                status_user: statusUser
              } = checkEmail[0]
              const payload = {
                userId,
                userName,
                userEmail,
                statusUser
              }
              const UpdateLoginData = {
                login_date: new Date()
              }
              await userHaslogin(UpdateLoginData, userId)
              const token = jwt.sign(payload, process.env.code_secretJWT, {
                expiresIn: '3h'
              })
              const lastResult = { ...payload, token }
              return helper.response(
                res,
                200,
                `Success Login username ${userName}`,
                lastResult
              )
            } else {
              return helper.response(
                res,
                404,
                'The password you entered is incorrect !! please check again :)'
              )
            }
          } else {
            return helper.response(
              res,
              404,
              "You haven't activated your account yet"
            )
          }
        } else {
          return helper.response(res, 400, "You haven't registered yet!")
        }
      } else {
        return helper.response(res, 400, 'Field cannot be empty')
      }
    } catch (err) {
      return helper.response(res, 400, 'Bad Request', err)
    }
  },
  confirmEmailAccount: async (req, res) => {
    try {
      const { tokenConfirm } = req.params
      const checkToken = await getUserAccountbytToken(tokenConfirm)
      if (checkToken.length > 0) {
        if (checkToken[0].status_user === 'Not Active') {
          const setData = {
            status_user: 'Active',
            update_at: new Date()
          }
          const result = await updateStatusUser(setData, tokenConfirm)
          return helper.response(
            res,
            200,
            `Activation your Email ${checkToken[0].user_email} Succesfully`,
            result
          )
        } else {
          return helper.response(
            res,
            400,
            `Your Account ${checkToken[0].user_email} has been Activated`
          )
        }
      } else {
        return helper.response(res, 400, 'Invalid token!!')
      }
    } catch (err) {
      return helper.response(res, 400, 'Bad Request', err)
    }
  },
  sendEmailForgorPassword: async (req, res) => {
    try {
      const { userEmail } = req.body
      const checkEmail = await getUserAccountModel(userEmail)
      if (checkEmail.length > 0) {
        const setData = {
          token_forgotpassword: require('crypto')
            .randomBytes(15)
            .toString('hex'),
          update_at: new Date()
        }
        const result = await updateForgotToken(setData, userEmail)
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          port: 587,
          secure: false,
          auth: {
            user: process.env.email,
            pass: process.env.emailpassword
          }
        })
        const mailOPtion = {
          from: `"Chat Us "${process.env.email}`,
          to: `${userEmail}`,
          subject: `Hello ${checkEmail[0].username}, I'm from ChatUs`,
          html: `<h2>I Got News you forgot your password if you want to re-new your password click this link</h2>
                  <p>Click This Link For re-new your password</p>
                  <a href ="https://chatuss.netlify.app/resetpassword/${result.token_forgotpassword}">Activation Email</a>`
        }
        transporter.sendMail(mailOPtion, (err, result) => {
          if (err) {
            return helper.response(res, 500, 'Server Got Error, Sorry :(', err)
          } else {
            return helper.response(
              res,
              200,
              `Check your Email ${checkEmail[0].user_email} for the keys`
            )
          }
        })
      } else {
        return helper.response(res, 400, "You haven't registered yet!")
      }
    } catch (err) {
      return helper.response(res, 400, 'Bad Request', err)
    }
  },
  updatePasswordForgot: async (req, res) => {
    try {
      const { tokenForgot, newPassword } = req.body
      const checkToken = await getUserAccountbytTokenForgot(tokenForgot)
      if (checkToken.length > 0) {
        const salt = bcrypt.genSaltSync(10)
        const encryptPassword = bcrypt.hashSync(newPassword, salt)
        const setData = {
          password: encryptPassword,
          token_forgotpassword: '',
          update_at: new Date()
        }
        await updatePasswordForgot(setData, tokenForgot)
        return helper.response(res, 200, 'Reset your Password Succesfully')
      } else {
        return helper.response(res, 400, 'Invalid token!!')
      }
    } catch (err) {
      return helper.response(res, 400, 'Bad Request', err)
    }
  },
  checkAccount: async (req, res) => {
    try {
      const { userEmail } = req.body
      const checkAccount = await getUserAccountModel(userEmail)
      if (checkAccount.length > 0) {
        return helper.response(
          res,
          200,
          `Success Check Account username ${checkAccount[0].username}`,
          checkAccount
        )
      } else {
        return helper.response(
          res,
          404,
          "You haven't activated your account yet"
        )
      }
    } catch (err) {
      return helper.response(res, 400, 'Bad Request', err)
    }
  },
  updatePassword: async (req, res) => {
    try {
      const { id } = req.params
      const { newPassword } = req.body
      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(newPassword, salt)
      const setData = {
        password: encryptPassword,
        update_at: new Date()
      }
      await updatePassword(setData, id)
      return helper.response(res, 200, 'Update your Password Succesfully')
    } catch (err) {
      return helper.response(res, 400, 'Bad Request', err)
    }
  },
  logoutUser: async (req, res) => {
    try {
      const { id } = req.params
      const UpdateLogoutdata = {
        login_date: '0000-00-00 00:00:00'
      }
      await userHaslogout(UpdateLogoutdata, id)
      return helper.response(res, 200, 'Logout Success Succesfully')
    } catch (err) {
      return helper.response(res, 400, 'Bad Request', err)
    }
  },
  updatePhonenumber: async (req, res) => {
    try {
      const { id } = req.params
      const { phoneNumber } = req.body
      const setData = {
        phone_number: phoneNumber,
        update_at: new Date()
      }
      await updatePhonenumb(setData, id)
      return helper.response(res, 200, 'Update your phone number Succesfully')
    } catch (err) {
      return helper.response(res, 400, 'Bad Request', err)
    }
  },
  updateUser: async (req, res) => {
    try {
      const { userEmail } = req.params
      const checkAccount = await getUserAccountModel(userEmail)
      const { fullName, userName, bioGrap } = req.body
      if (checkAccount.length > 0) {
        let imageUser
        if (req.file === undefined) {
          imageUser = {
            image_user: checkAccount[0].image_user
          }
        } else if (
          checkAccount[0].image_user === null ||
          checkAccount[0].image_user === ''
        ) {
          imageUser = {
            image_user: req.file === undefined ? '' : req.file.filename
          }
        } else if (req.file.filename !== checkAccount[0].image_user) {
          fs.stat(
            `./userImage/${checkAccount[0].image_user}`,
            function (_err, stats) {
              fs.unlink(`./userImage/${checkAccount[0].image_user}`, (_err) => {
                console.log(
                  `Success Delete Image ${checkAccount[0].image_user}`
                )
              })
            }
          )
          imageUser = {
            image_user: req.file === undefined ? '' : req.file.filename
          }
        }

        const setData = {
          fullname: fullName,
          username: userName,
          bio: bioGrap
        }
        const Setfull = { ...setData, ...imageUser }
        const result = await updateUser(Setfull, userEmail)
        return helper.response(
          res,
          200,
          'Update your Account Succesfully',
          result
        )
      } else {
        fs.unlink(`./userImage/${req.file.filename}`, (err) => {
          if (err) throw err
        })
        return helper.response(res, 404, 'Email Not Registered')
      }
    } catch (err) {
      return helper.response(res, 400, 'Bad Request', err)
    }
  },
  updateLocation: async (req, res) => {
    try {
      const { userEmail } = req.params
      const checkAccount = await getUserAccountModel(userEmail)
      const { lat, long } = req.body
      if (checkAccount.length > 0) {
        const setData = {
          lat,
          long
        }
        const result = await updateUser(setData, userEmail)
        return helper.response(
          res,
          200,
          'Update your Location Succesfully',
          result
        )
      } else {
        return helper.response(res, 404, 'Email Not Registered')
      }
    } catch (err) {
      return helper.response(res, 400, 'Bad Request', err)
    }
  }
}
