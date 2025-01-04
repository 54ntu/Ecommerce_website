import { Request, Response } from "express"


const errorHandler = (fn: Function) => {
    return (req: Request, res: Response) => {
        fn(req, res).catch((error: Error) => {
            res.status(500).json({
                message: "Internal server error",
                errorMessage: error.message
            })
        })
    }
}


export default errorHandler