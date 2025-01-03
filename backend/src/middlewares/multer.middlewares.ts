import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        const imageName = Date.now() + '-' + file.originalname
        cb(null, imageName)
    }
})

const upload = multer({ storage: storage })

export default upload;