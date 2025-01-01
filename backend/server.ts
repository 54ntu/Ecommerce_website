import adminSeeder from "./adminSeeder";
import app from "./app";
import { envConfig } from "./src/config/config";
import CategoryController from "./src/controllers/category.controller";
import User from "./src/database/model/user.model";





function startServer() {
    const port = envConfig.port || 3000
    adminSeeder();
    app.listen(port, () => {
        CategoryController.seedCategory();
        console.log(`server is running at port ${port}`)
    })
}

startServer();