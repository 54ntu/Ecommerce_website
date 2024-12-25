import app from "./app";
import { envConfig } from "./src/config/config";





function startServer() {
    const port = envConfig.port || 3000
    app.listen(port, () => {
        console.log(`server is running at port ${port}`)
    })
}

startServer();