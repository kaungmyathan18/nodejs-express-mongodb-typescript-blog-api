import { Controller } from '@interfaces/controller.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { getParsedPaginationData } from '@utils/functions';
import * as express from 'express';
import { CreateUserDTO } from './dto/createUser.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { UserService } from './users.service';

export class UserController extends Controller {
  private userService = new UserService();
  route = '/users';
  router = express.Router();

  constructor() {
    super();
    this.bindMethods();
    this.initializeRoutes();
  }

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
      const { page, rowsPerPage, searchKeywords } = getParsedPaginationData(
        request.query,
      );
      const filter =
        searchKeywords.trim().length === 0
          ? {}
          : { $text: { $search: searchKeywords } };

      const results = await this.userService.getUsers({
        page,
        rowsPerPage,
        searchKeywords,
        filter,
      });
      return response.json(results);
    } catch (error) {
      return next(error);
    }
  }

  async getUserById(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const user = await this.userService.getUserById(request.params.id);
      return response.json(user);
    } catch (error) {
      return next(error);
    }
  }

  private async createUser(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const user = await this.userService.createUser(request.body);
      user.password = undefined;
      return response.json(user);
    } catch (error) {
      return next(error);
    }
  }

  private updateUser(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) {
    try {
      return this.userService
        .updateUser(request.params.id, request.body)
        .then((result) => response.json(result));
    } catch (error) {
      return next(error);
    }
  }
  async deleteUser(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const result = await this.userService.deleteUser(request.params.id);
      return response.json(result);
    } catch (error) {
      return next(error);
    }
  }
}
