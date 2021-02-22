const multer = require('multer')
const helper = require('../helper/response')
/* Storage For User Image */
const storageUser = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './userImage')
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
  }
})
/* ================================================ */

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/webp' ||
    file.mimetype === 'application/octet-stream'
  ) {
    cb(null, true)
  } else {
    cb(new Error('Extension file must be PNG , JPEG or webp'), false)
  }
}

const uploadUser = multer({
  storage: storageUser,
  fileFilter,
  limits: { fileSize: 200000 }
}).single('userImage')

const uploadFilterUser = (req, res, next) => {
  uploadUser(req, res, (err) => {
    if (err && err.code === 'LIMIT_FILE_SIZE') {
      // A Multer error occurred when uploading.
      return helper.response(res, 400, 'Max File Size 2 Mb')
    } else if (err instanceof multer.MulterError) {
      return helper.response(res, 400, err.message)
    } else if (err) {
      // An unknown error occurred when uploading.
      return helper.response(res, 400, err.message)
    }
    next()
    // Everything went fine.
  })
}

module.exports = uploadFilterUser
