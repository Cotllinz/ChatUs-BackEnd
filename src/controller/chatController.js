const helper = require('../helper/response')
const {
  createRoom,
  getRoom,
  updateRoomDate,
  roomList
} = require('../model/roomchatModel')
const {
  createChat,
  getChat,
  updateStatusRead,
  countNotreadChat,
  getLastChat
} = require('../model/chatModel')

module.exports = {
  chatting: async (req, res) => {
    try {
      const { idSender, idRecaiver, chatText } = req.body
      const checkRoom = await getRoom(idSender, idRecaiver)
      if (checkRoom.length > 0) {
        const setData = {
          room_id: checkRoom[0].room_id,
          idChat_sender: idSender,
          idChat_recaiver: idRecaiver,
          chat_text: chatText,
          created_at: new Date()
        }
        const result = await createChat(setData)
        const updateDateroom = {
          updated_at: new Date()
        }
        const rooms = parseInt(result.room_id)
        await updateRoomDate(updateDateroom, rooms)
        return helper.response(res, 200, 'Chat Success', result)
      } else {
        const randomRoom = Math.floor(Math.random() * Math.floor(19999))
        const setRoom1 = {
          room_id: randomRoom,
          id_sender: idSender,
          id_receiver: idRecaiver,
          created_at: new Date(),
          updated_at: new Date()
        }
        await createRoom(setRoom1)
        const setRoom2 = {
          room_id: randomRoom,
          id_sender: idRecaiver,
          id_receiver: idSender,
          created_at: new Date(),
          updated_at: new Date()
        }
        await createRoom(setRoom2)
        const setData = {
          room_id: randomRoom,
          idChat_sender: idSender,
          idChat_recaiver: idRecaiver,
          chat_text: chatText,
          created_at: new Date()
        }
        const result = await createChat(setData)
        return helper.response(res, 200, 'Chat Success', result)
      }
    } catch (err) {
      return helper.response(res, 400, 'Bad Request', err)
    }
  },
  getChat: async (req, res) => {
    try {
      const { idRoom, iduser } = req.body
      const result = await getChat(idRoom)
      if (result.length > 0) {
        await updateStatusRead(idRoom, iduser)
        return helper.response(res, 200, 'Success Get Chat', result)
      } else {
        return helper.response(
          res,
          404,
          'History Chat not found !! Lets Chating with him'
        )
      }
    } catch (err) {
      return helper.response(res, 400, 'Bad Request', err)
    }
  },
  getRoomlist: async (req, res) => {
    try {
      const { id } = req.params
      const result = await roomList(id)
      if (result.length > 0) {
        for (let i = 0; i < result.length; i++) {
          result[i].unreadmessage = await countNotreadChat(
            result[i].room_id,
            result[i].id_sender
          )
          result[i].lastChat = await getLastChat(result[i].room_id)
        }
        return helper.response(res, 200, 'Success Get Room List', result)
      } else {
        return helper.response(
          res,
          404,
          'You dont have any room !! lets chating with someone'
        )
      }
    } catch (err) {
      return helper.response(res, 400, 'Bad Request', err)
    }
  }
}
