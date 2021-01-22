const helper = require('../helper/response')
const {
  addFriend,
  checkFriend,
  deleteFriend,
  searchFriend,
  checkActiveAccount,
  getFriendList,
  getRequestFriend,
  patchStatusFriend,
  countRequestFriend
} = require('../model/addFriendModel')
module.exports = {
  addFriendController: async (req, res) => {
    try {
      const { idRequest, idResponse } = req.body
      const checkFriendData = await checkFriend(idRequest, idResponse)
      if (checkFriendData.length <= 0) {
        const setData = {
          user_idRequest: idRequest,
          user_idResponse: idResponse,
          created_at: new Date()
        }
        const result = await addFriend(setData)
        return helper.response(res, 200, 'Add Friend Succesfully', result)
      } else {
        return helper.response(
          res,
          400,
          'You has been add him being to your friend'
        )
      }
    } catch (err) {
      return helper.response(res, 400, 'Bad Request', err)
    }
  },
  deleteFriendController: async (req, res) => {
    try {
      const { id } = req.params
      const result = await deleteFriend(id)
      if (result.affectedRows > 0) {
        return helper.response(
          res,
          200,
          'Success Remove Friend from your contact'
        )
      } else {
        return helper.response(
          res,
          400,
          `Invalid delete !!! id friend list ${id} not found`
        )
      }
    } catch (err) {
      return helper.response(res, 400, 'Bad Request', err)
    }
  },
  searchFriendController: async (req, res) => {
    try {
      const { myEmail, friendEmail } = req.body

      if (myEmail !== friendEmail) {
        const checkAccount = await checkActiveAccount(friendEmail)
        const result = await searchFriend(myEmail, friendEmail)
        if (checkAccount.length > 0) {
          if (result.length > 0) {
            return helper.response(
              res,
              200,
              `Success Got Email ${friendEmail}`,
              result
            )
          } else {
            return helper.response(res, 400, `Email ${friendEmail}  Not Found`)
          }
        } else {
          return helper.response(res, 400, `Email ${friendEmail}  Not Found`)
        }
      } else {
        return helper.response(res, 400, `You Can't search you own email`)
      }
    } catch (err) {
      return helper.response(res, 400, 'Bad Request', err)
    }
  },
  getFriendlistController: async (req, res) => {
    try {
      const { id } = req.params
      const result = await getFriendList(id)
      if (result.length > 0) {
        return helper.response(res, 200, 'Succes Get Friend List', result)
      } else {
        return helper.response(res, 400, 'You Dont Have a Friend')
      }
    } catch (err) {
      return helper.response(res, 400, 'Bad Request', err)
    }
  },
  getRequestfriend: async (req, res) => {
    try {
      const { id } = req.params
      const result = await getRequestFriend(id)
      if (result.length > 0) {
        return helper.response(
          res,
          200,
          'Succes Get Friend Request List',
          result
        )
      } else {
        return helper.response(res, 400, 'You Dont Have a Friend Request')
      }
    } catch (err) {
      return helper.response(res, 400, 'Bad Request', err)
    }
  },
  AcceptFriendRequest: async (req, res) => {
    try {
      const { idRequest, idResponse } = req.body
      const checkFriendData = await checkFriend(idRequest, idResponse)
      if (checkFriendData.length <= 0) {
        const setData = {
          user_idRequest: idRequest,
          user_idResponse: idResponse,
          friend_status: 'Accept',
          created_at: new Date()
        }
        await patchStatusFriend(idResponse, idRequest)
        const result = await addFriend(setData)
        return helper.response(res, 200, 'Add Friend Succesfully', result)
      } else {
        return helper.response(
          res,
          400,
          'You has been add him being to your friend'
        )
      }
    } catch (err) {
      return helper.response(res, 400, 'Bad Request', err)
    }
  },
  totalFriendRequest: async (req, res) => {
    try {
      const { id } = req.params
      const result = await countRequestFriend(id)
      return helper.response(res, 200, 'Add Friend Succesfully', result)
    } catch (err) {
      return helper.response(res, 400, 'Bad Request', err)
    }
  }
}
