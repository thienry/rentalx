import path from 'path'
import crypto from 'crypto'
import multer from 'multer'

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp', 'avatar')

export default {
  tmpFolder,
  storage: multer.diskStorage({ destination: tmpFolder }),
  filename: (req, file, cb) => {
    const fileHash = crypto.randomBytes(16).toString('hex')
    const filename = `${fileHash}-${file.originalname}`
    return cb(null, filename)
  },
}
