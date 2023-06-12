import { Controller } from '@interfaces/controller.interface';
import express from 'express';
import errorMiddleware from 'middlewares/error.middleware';
import mongoose from 'mongoose';
import morgan from 'morgan';
import { DATABASE_URL, PORT } from './constants';
import i18n from './i18n.config';

export class App {
  private app: express.Application;
  constructor(private controllers: Controller[]) {
    this.app = express();
  }

  public run() {
    mongoose
      .connect(DATABASE_URL)
      .then(() => {
        console.log('connected to database');
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeErrorMiddlewares();
        this.listen();
      })
      .catch(() => {
        console.log('error connectiong to database');
        process.exit(1);
      });
  }

  private initializeErrorMiddlewares() {
    this.app.use(errorMiddleware);
  }

  private initializeMiddlewares() {
    this.app.use(i18n.init);
    this.app.use(express.json());
    this.app.use(morgan('dev'));
  }

  private initializeRoutes() {
    this.controllers.map((controller) => this.app.use(controller.router));
  }

  private listen() {
    this.app.listen(PORT, () => {
      console.log(`server is running in ${PORT}`);
    });
  }
}
