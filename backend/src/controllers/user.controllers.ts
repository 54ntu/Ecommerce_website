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


}


export default UserController;