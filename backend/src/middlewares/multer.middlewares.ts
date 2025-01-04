import { Request } from "express"
import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, cb: any) {
        cb(null, './src/uploads')
    },
    filename: function (req: Request, file: Express.Multer.File, cb: any) {
        const imageName = Date.now() + '-' + file.originalname
        cb(null, imageName)
    }
})

const upload = multer({ storage: storage })

export default upload;