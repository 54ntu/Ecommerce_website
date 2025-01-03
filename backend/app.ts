import express from 'express'
import './src/database/connection'
import userRoute from './src/routes/user.routes'
import categoryRoute from './src/routes/category.routes'
import productRoute from './src/routes/product.routes'
const app = express();


app.use(express.json());


//localhost:3000.api/auth

app.use("/api/auth", userRoute);
app.use("/api/category", categoryRoute)
app.use("/api/product", productRoute)



export default app;