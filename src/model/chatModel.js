const connection = require('../config/mysql')
module.exports = {
  createChat: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'insert into chat_data set ?',
        setData,
        (err, result) => {
          const newResult = {
            ...setData
          }
          !err ? resolve(newResult) : reject(new Error(err))
        }
      )
    })
  },
  getChat: (roomId) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'select chat_text, room_id, idChat_sender, idChat_recaiver from chat_data where room_id = ? order by created_at ASC',
        roomId,
        (err, result) => {
          !err ? resolve(result) : reject(new Error(err))
        }
      )
    })
  },
  getLastChat: (roomId) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'select chat_text, room_id, idChat_sender, idChat_recaiver from chat_data where room_id = ? order by created_at DESC',
        roomId,
        (err, result) => {
          !err ? resolve(result[0]) : reject(new Error(err))
        }
      )
    })
  },
  updateStatusRead: (idRoom, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'update chat_data set status_read ="Read" where room_id = ? && idChat_sender != ?',
        [idRoom, id],
        (err, result) => {
          !err ? resolve(result) : reject(new Error(err))
        }
      )
    })
  },
  countNotreadChat: (idRoom, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'select COUNT(*) AS total from chat_data where room_id = ? && idChat_sender != ? && status_read = "Not Read"',
        [idRoom, id],
        (err, result) => {
          !err ? resolve(result) : reject(new Error(err))
        }
      )
    })
  }
}
