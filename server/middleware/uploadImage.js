const multer = require('multer')
const storage = multer.memoryStorage()
const { GridFsStorage } = require('multer-gridfs-storage')

const upload = multer({ storage })

module.exports = upload