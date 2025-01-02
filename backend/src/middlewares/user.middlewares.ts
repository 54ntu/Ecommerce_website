import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { envConfig } from "../config/config";

class UserMiddleware {
    async isUserLoggin(req: Request, res: Response, next: NextFunction): Promise<void> {



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
        jwt.verify(token, envConfig.jwtsecretkey as string, async (err, result) => {
            if (err) {
                res.status(403).json({
                    status: 'error',
                    message: 'Unauthorized'
                })
            } else {
                console.log(result)

                //@ts-ignore
                req.userId = result.userId;

                next();
            }
        })
    }


    async isAdmin(req: Request, res: Response, next: NextFunction): Promise<void> {
        const token = req.headers.authorization;
        if (!token) {
            res.status(403).json({
                status: 'error',
                message: 'token must be needed'
            })
            return;
        }

        jwt.verify(token, envConfig.jwtsecretkey as string, async (err, result) => {
            if (err) {
                res.status(403).json({
                    status: 'error',
                    message: 'Unauthorized'
                })
            } else {
                //@ts-ignore
                if (result.role == 'admin') {
                    next();
                } else {
                    res.status(403).json({
                        status: 'error',
                        message: 'dont have permission'
                    })
                }
            }
        })
    }


}

export default new UserMiddleware;