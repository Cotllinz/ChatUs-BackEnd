const connection = require('../config/mysql')
module.exports = {
  createRoom: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'insert into room_list set ?',
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
  getRoom: (userSend, userRecaiver) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'select * from room_list where id_sender = ? && id_receiver = ?',
        [userSend, userRecaiver],
        (err, result) => {
          !err ? resolve(result) : reject(new Error(err))
        }
      )
    })
  },
  updateRoomDate: (setData, idRoom) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'update room_list set ? where room_id = ?',
        [setData, idRoom],
        (err, result) => {
          !err ? resolve(result) : reject(new Error(err))
        }
      )
    })
  },
  roomList: (idSender) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'select * from room_list join user_account on id_receiver = id_user where id_sender = ? order by room_list.updated_at DESC',
        idSender,
        (err, result) => {
          for (let i = 0; i < result.length; i++) {
            delete result[i].password
            delete result[i].token_confirmemail
            delete result[i].token_forgotpassword
          }
          !err ? resolve(result) : reject(new Error(err))
        }
      )
    })
  }
}
