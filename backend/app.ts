import express from 'express'
import './src/database/connection'
import userRoute from './src/routes/user.routes'
const app = express();


app.use(express.json());


//localhost:3000.api/auth

app.use("/api/auth", userRoute);



export default app;