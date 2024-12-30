import { Response } from "express";
import ApiResponse from "./ApiResponse";

const checkOtpExpiration = (res: Response, otpGeneratedTime: string, expiryTime: number) => {
    const currentTime = Date.now()
    if (currentTime - parseInt(otpGeneratedTime) > 120000) {
        ApiResponse(res, 403, "OTP expired😑")
    } else {
        ApiResponse(res, 200, "OTP verified successfully😊")
    }

}

export default checkOtpExpiration;