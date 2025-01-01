import adminSeeder from "./adminSeeder";
import app from "./app";
import { envConfig } from "./src/config/config";
import User from "./src/database/model/user.model";





function startServer() {
    const port = envConfig.port || 3000
    adminSeeder();
    app.listen(port, () => {
        console.log(`server is running at port ${port}`)
    })
}

startServer();