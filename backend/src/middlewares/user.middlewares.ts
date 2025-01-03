import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { envConfig } from "../config/config";



interface CustomRequest extends Request {
    user?: {
        userId: string;
        role: string;
    }
}


class UserMiddlewares {
    async isUserLoggin(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {



        //receive token from the header
        const token = req.headers.authorization
        if (!token) {
            res.status(403).json({
                status: 'error',
                message: 'token must be needed'
            })
            return;
        }

        //verify the token
        // jwt.verify(token, envConfig.jwtsecretkey as string, async (err, result) => {
        //     if (err) {
        //         res.status(403).json({
        //             status: 'error',
        //             message: 'Unauthorized'
        //         })
        //     } else {
        //         console.log(result)

        //         //@ts-ignore
        //         req.user = result.userId;

        //         next();
        //     }
        // })


        const decoded = await jwt.verify(token, envConfig.jwtsecretkey as string) as { userId: string, role: string }
        req.user = decoded;
        next();
    }


    async isAdmin(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
        // console.log(`req.user value is ${req.user?.role}`)
        if (!req.user) {
            res.status(403).json({

                status: 'error',
                message: 'user role is required!!!!'
            })
        }

        if (req.user?.role === 'admin') {
            next();
        } else {
            res.status(403).json({
                status: 'error',
                message: 'you are not authorized to perform this task.!'
            })
        }

    }


}

export default new UserMiddlewares;