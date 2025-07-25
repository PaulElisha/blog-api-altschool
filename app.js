import { config } from "dotenv";
config({ path: ".env" });
import express from "express";
import { blogRouter } from "./src/routes/BlogRouter.js";
import { userRouter } from "./src/routes/UserRouter.js";
import { Db } from "./src/config/db.js";

const port = process.env.PORT;
const hostname = process.env.HOSTNAME;
const MONGODB_URI = process.env.MONGODB_URI;
console.log("Port and Hostname:", `${port} - ${hostname} - ${MONGODB_URI}`);

class App {
    constructor() {
        this.db = new Db();
        this.app = express();
        this.initializeMiddlewares();
        this.initializeRoutes();
    }

    initializeMiddlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    initializeRoutes() {
        this.app.use("/blog", blogRouter);
        this.app.use("/user", userRouter);
    }

    startServer() {
        this.app.listen(port, () => {
            console.log(`Server running at http://${hostname}:${port}/`);
        });
    }
}

const app = new App();
app.startServer();