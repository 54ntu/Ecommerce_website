import { Request, Response } from "express"
import User from "../database/model/user.model"
import bcrypt from "bcrypt"




class UserController {

    static async register(req: Request, res: Response) {
        const { username, email, password } = req.body
        if (!username || !email || !password) {
            res.status(400).json({ message: "All fields are required" })
            return;
        }
        //check whether the user already exists
        const [data] = await User.findAll({
            where: {
                email: email
            }
        })
        if (data) {
            res.status(400).json({ message: "User already exists" })
            return;
        }
        //if everything is fined then we just insert the data into the database

        await User.create({
            username,
            email,
            password: bcrypt.hashSync(password, 10),
        })
        res.status(201).json({ message: "User registered successfully" })

    }


    static async login(req: Request, res: Response) {
        //get the email and password from the req.body
        //check email first whether it exists or not
        //if exists then check the password
        //if password is correct then generate token and send that token
        const { email, password } = req.body

        if (!email || !password) {
            res.status(400).json({
                message: "please provide email and password"
            })
            return;
        }

        const emailExists = await User.findAll({
            where: {
                email: email
            }
        })

        if (emailExists.length === 0) {
            res.status(404).json({
                message: "email does not exists"
            })
        } else {
            const user = emailExists[0]
            const isPasswordMatched = bcrypt.compareSync(password, user.password)
            if (!isPasswordMatched) {
                res.status(400).json({

                    message: "password doesnot match"
                })
            } else {
                res.status(200).json({
                    message: "login successfully"
                })
            }

        }
    }


}


export default UserController;