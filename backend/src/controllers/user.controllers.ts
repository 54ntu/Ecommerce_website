import { Request, Response } from "express"
import User from "../database/model/user.model"
import bcrypt from "bcrypt"
import generateToken from "../services/generateToken"
import generateOtp from "../services/generateOtp"
import sendMail from "../services/sendmail"
import getData from "../services/findData"
import ApiResponse from "../services/ApiResponse"
import checkOtpExpiration from "../services/otpExpiry"




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

        const emailExists = await getData(User, email)

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

                //generate token

                const token = generateToken(user.id)
                res.status(200).json({
                    message: "login successfully",
                    token
                })
            }

        }
    }



    static async handleForgotPassword(req: Request, res: Response) {
        const { email } = req.body
        if (!email) {
            ApiResponse(res, 400, "please provide email")
            return
        }
        const isEmailExists = await User.findAll({
            where: {
                email: email
            }
        })
        if (isEmailExists.length === 0) {
            ApiResponse(res, 404, 'email does not exists')
            return;
        }
        //generate otp and send it through mail
        const otp = generateOtp()
        await sendMail({
            to: email,
            subject: "Reset Password",
            text: `Your OTP is ${otp}`
        })
        isEmailExists[0].otp = otp.toString()
        isEmailExists[0].otpGeneratedTime = Date.now().toString()
        await isEmailExists[0].save()
        return ApiResponse(res, 200, "OTP sent to your email")

    }

    static async verifyOTP(req: Request, res: Response) {
        const { email, otp } = req.body
        if (!email || !otp) {
            ApiResponse(res, 400, "please provide email and otp😒")
            return;
        }

        const isEmailExists = await getData(User, email)

        if (isEmailExists.length === 0) {
            ApiResponse(res, 404, "email does not exists ")
            return;
        }


        //otp verification
        const [user] = await User.findAll({
            where: {
                email: email,
                otp: otp
            }
        })

        if (!user) {
            ApiResponse(res, 400, "Invalid OTP")
            return;
        }

        const otpGeneratedTime = user.otpGeneratedTime
        checkOtpExpiration(res, otpGeneratedTime, 120000)
    }


    static async resetPassword(req: Request, res: Response) {
        const { newPassword, confirmPassword } = req.body
        if (!newPassword || !confirmPassword) {
            ApiResponse(res, 400, "newpassword and confirmpassword are required")
            return;
        }

        if (newPassword !== confirmPassword) {
            ApiResponse(res, 400, "password does not match")
            return;
        }



    }





}

export default UserController;