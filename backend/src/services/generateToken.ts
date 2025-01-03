import jwt from 'jsonwebtoken';
import { envConfig } from '../config/config';

const generateToken = (userId: string, role: string) => {
    const token = jwt.sign({ userId: userId, role: role }, envConfig.jwtsecretkey as string, {
        expiresIn: envConfig.jwtexpiresin
    })
    return token;

}


export default generateToken;