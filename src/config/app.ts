import { Controller } from "@interfaces/controller.interface";
import express from "express";
import { PORT } from "./constants";

export class App {
    private app:express.Application;
    constructor(controllers:Controller[]) {
        this.app = express();
        this.initializeRoutes(controllers);
    }
    private initializeRoutes(controllers:Controller[]) {
        controllers.map(controller=>(
            this.app.use(controller.router)
        ))
    }

    listen() {
        this.app.listen(PORT,()=>{
            console.log(`server is running in ${PORT}`)
        });
    }
}