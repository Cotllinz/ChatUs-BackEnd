const connection = require('../config/mysql')
module.exports = {
  addFriend: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'insert into friend_list set ? ',
        setData,
        (err, result) => {
          const newResult = {
            id: result.insertId,
            ...setData
          }
          !err ? resolve(newResult) : reject(new Error(err))
        }
      )
    })
  },
  checkFriend: (idReq, idRes) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'select * from friend_list where user_idRequest = ? && user_idResponse = ?',
        [idReq, idRes],
        (err, result) => {
          !err ? resolve(result) : reject(new Error(err))
        }
      )
    })
  },
  deleteFriend: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'delete from friend_list where id = ?',
        id,
        (err, result) => {
          !err ? resolve(result) : reject(new Error(err))
        }
      )
    })
  },
  checkActiveAccount: (emailFriend) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'select * from user_account where user_email = ? && status_user = "Active"',
        emailFriend,
        (err, result) => {
          !err ? resolve(result) : reject(new Error(err))
        }
      )
    })
  },
  searchFriend: (myEmail, emailFriend) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'select * from user_account where user_email = ? && user_email != ?',
        [emailFriend, myEmail],
        (err, result) => {
          delete result[0].password &&
            delete result[0].token_confirmemail &&
            delete result[0].token_forgotpassword
          !err ? resolve(result) : reject(new Error(err))
        }
      )
    })
  },
  getFriendList: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'select * from friend_list join user_account on user_idResponse = id_user where user_idRequest = ?',
        id,
        (err, result) => {
          for (let i = 0; i < result.length; i++) {
            delete result[i].password &&
              delete result[i].token_confirmemail &&
              delete result[i].token_forgotpassword
          }
          !err ? resolve(result) : reject(new Error(err))
        }
      )
    })
  },
  patchStatusFriend: (idReq, idRes) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'update friend_list set friend_status = "Accept" where user_idRequest = ? && user_idResponse = ?',
        [idReq, idRes],
        (err, result) => {
          !err ? resolve(result) : reject(new Error(err))
        }
      )
    })
  },
  getRequestFriend: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'select * from friend_list join user_account on user_idRequest = id_user where user_idResponse = ? && friend_status = "Waiting"',
        id,
        (err, result) => {
          for (let i = 0; i < result.length; i++) {
            delete result[i].password &&
              delete result[i].token_confirmemail &&
              delete result[i].token_forgotpassword
          }
          !err ? resolve(result) : reject(new Error(err))
        }
      )
    })
  },
  countRequestFriend: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT COUNT(*) AS total from friend_list join user_account on user_idRequest = id_user where user_idResponse = ? && friend_status = "Waiting"',
        id,
        (err, result) => {
          !err ? resolve(result[0].total) : reject(new Error(err))
        }
      )
    })
  }
}
