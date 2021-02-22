const connection = require('../config/mysql')

module.exports = {
  userRegisterModel: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'insert into user_account set ?',
        setData,
        (err, result) => {
          const newResult = {
            id_user: result.insertId,
            ...setData
          }
          delete newResult.password
          !err ? resolve(newResult) : reject(new Error(err))
        }
      )
    })
  },
  getUserAccountModel: (email) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'select * from user_account where user_email = ?',
        email,
        (err, result) => {
          !err ? resolve(result) : reject(new Error(err))
        }
      )
    })
  },
  getUserAccountbytToken: (tokenConfirm) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'select * from user_account where token_confirmemail = ?',
        tokenConfirm,
        (err, result) => {
          !err ? resolve(result) : reject(new Error(err))
        }
      )
    })
  },
  getUserAccountbytTokenForgot: (tokenConfirm) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'select * from user_account where token_forgotpassword = ?',
        tokenConfirm,
        (err, result) => {
          !err ? resolve(result) : reject(new Error(err))
        }
      )
    })
  },
  updateStatusUser: (setData, token) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'update user_account set ? where token_confirmemail = ?',
        [setData, token],
        (err, result) => {
          const newResult = {
            token_confirmemail: token,
            ...setData
          }
          !err ? resolve(newResult) : reject(new Error(err))
        }
      )
    })
  },
  updateForgotToken: (setData, email) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'update user_account set ? where user_email  = ?',
        [setData, email],
        (err, result) => {
          const newResult = {
            user_email: email,
            ...setData
          }
          !err ? resolve(newResult) : reject(new Error(err))
        }
      )
    })
  },
  updatePasswordForgot: (setData, token) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'update user_account set ? where token_forgotpassword = ?',
        [setData, token],
        (err, result) => {
          const newResult = {
            ...setData
          }
          !err ? resolve(newResult) : reject(new Error(err))
        }
      )
    })
  },
  updatePassword: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'update user_account set ? where id_user = ?',
        [setData, id],
        (err, result) => {
          const newResult = {
            id_user: id,
            ...setData
          }
          !err ? resolve(newResult) : reject(new Error(err))
        }
      )
    })
  },
  userHaslogin: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'update user_account set ? where id_user = ?',
        [setData, id],
        (err, result) => {
          const newResult = {
            id_user: id,
            ...setData
          }
          !err ? resolve(newResult) : reject(new Error(err))
        }
      )
    })
  },
  userHaslogout: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'update user_account set ? where id_user = ?',
        [setData, id],
        (err, result) => {
          const newResult = {
            id_user: id,
            ...setData
          }
          !err ? resolve(newResult) : reject(new Error(err))
        }
      )
    })
  },
  updatePhonenumb: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'update user_account set ? where id_user = ?',
        [setData, id],
        (err, result) => {
          const newResult = {
            id_user: id,
            ...setData
          }
          !err ? resolve(newResult) : reject(new Error(err))
        }
      )
    })
  },
  updateUser: (setData, email) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'update user_account set ? where user_email = ?',
        [setData, email],
        (err, result) => {
          const newResult = {
            user_email: email,
            ...setData
          }
          !err ? resolve(newResult) : reject(new Error(err))
        }
      )
    })
  }
}
