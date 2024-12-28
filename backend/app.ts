import express from 'express'
import './src/database/connection'
const app = express();


app.use(express.json());


//localhost:3000.api/auth

app.use("/api/auth",)



export default app;