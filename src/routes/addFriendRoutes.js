const route = require('express').Router()
const {
  addFriendController,
  deleteFriendController,
  searchFriendController,
  getFriendlistController,
  getRequestfriend,
  AcceptFriendRequest,
  totalFriendRequest
} = require('../controller/addFriendController')

route.get('/friendrequest/:id', getRequestfriend)
route.get('/friendlist/:id', getFriendlistController)
route.get('/reqfriendCount/:id', totalFriendRequest)
route.post('/searchfriend', searchFriendController)
route.post('/addfriend', addFriendController)
route.post('/acceptFriend', AcceptFriendRequest)
route.delete('/deletefriend/:id', deleteFriendController)
module.exports = route
