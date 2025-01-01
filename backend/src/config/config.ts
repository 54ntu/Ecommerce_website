import "dotenv/config"


export const envConfig = {
    port: process.env.PORT,
    connectionString: process.env.CONNECTION_STRING,

    jwtsecretkey: process.env.JWT_SECRET_KEY,
    jwtexpiresin: process.env.JWT_EXPIRES_IN,
    email: process.env.EMAIL,
    password: process.env.EMAIL_PASSWORD,
    adminemail: process.env.ADMIN_EMAIL,
    adminPassword: process.env.ADMIN_PASSWORD,
    adminUsername: process.env.ADMIN_USERNAME,
}