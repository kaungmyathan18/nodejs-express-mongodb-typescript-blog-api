import { Controller } from "@interfaces/controller.interface";
import express from "express";
import errorMiddleware from "middlewares/error.middleware";
import mongoose from "mongoose";
import morgan from "morgan";
import { DATABASE_URL, PORT } from "./constants";
export class App {
    private app:express.Application;
    constructor(private controllers:Controller[]) {
        this.app = express();
        this.initializeDatabase();
    }

    private initializeDatabase() {
        mongoose.connect(DATABASE_URL,{}).then(()=>{
            console.log("connected to database")
            this.initializeMiddlewares();
            this.initializeRoutes();
            this.initializeErrorMiddlewares();
        }).catch(()=>console.log("error connectiong to database"))
    }

    private initializeErrorMiddlewares() {
        this.app.use(errorMiddleware);
    }

    private initializeMiddlewares() {
        this.app.use(express.json());
        this.app.use(morgan('dev'));
    }

    private initializeRoutes() {
        this.controllers.map(controller=>(
            this.app.use(controller.router)
        ))
    }

    listen() {
        this.app.listen(PORT,()=>{
            console.log(`server is running in ${PORT}`)
        });
    }
}