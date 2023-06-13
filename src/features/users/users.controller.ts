import validationMiddleware from '@middlewares/validation.middleware';
import * as express from 'express';
import { CreateUserDTO } from './dto/createUser.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { UserModel } from './models/user.model';

export class UserController {
  private userRepository = UserModel;
  route = '/users';
  router = express.Router();
  constructor() {}
  private bindMethods() {
    this.createUser = this.createUser.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.getUserById = this.getUserById.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  initializeRoutes() {
    this.router
      .post(this.route, validationMiddleware(CreateUserDTO), this.createUser)
      .get(`${this.route}/`, this.getUsers)
      .get(`${this.route}/:id`, this.getUserById)
      .put(
        `${this.route}/:id`,
        validationMiddleware(UpdateUserDTO),
        this.updateUser,
      )
      .delete(`${this.route}/:id`, this.deleteUser);
  }
  private async getUsers(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) {
    try {
    } catch (error) {
      return next(error);
    }
  }
  getUserById(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) {
    try {
    } catch (error) {
      return next(error);
    }
  }
  createUser(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) {
    try {
    } catch (error) {
      return next(error);
    }
  }
  updateUser(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) {
    try {
    } catch (error) {
      return next(error);
    }
  }
  deleteUser(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) {
    try {
    } catch (error) {
      return next(error);
    }
  }
}
