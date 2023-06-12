import { InternalServerError } from '@exceptions/InternalServerError';
import { InvalidIdExeption } from '@exceptions/invalidId.exception';
import NotFoundException from '@exceptions/notFound.exception';
import { Controller } from '@interfaces/controller.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { getParsedPaginationData } from '@utils/functions';
import * as express from 'express';
import httpStatus from 'http-status';
import { CreatePostDTO } from './dto/create-post.dto';
import { UpdatePostDTO } from './dto/update-post.dto';
import { postModel } from './models/post.model';

const tmpPosts = [
  {
    name: 'some name',
    id: 'some id',
  },
];

export class PostController extends Controller {
  private post = postModel;
  constructor() {
    super();
    this.route = '/posts';
    this.router = express.Router();
    this.bindMethods();
    this.initializeRoutes();
  }

  private bindMethods() {
    this.createPost = this.createPost.bind(this);
    this.getPosts = this.getPosts.bind(this);
    this.getPost = this.getPost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.updatePost = this.updatePost.bind(this);
  }

  initializeRoutes() {
    this.router
      .post(this.route, validationMiddleware(CreatePostDTO), this.createPost)
      .get(`${this.route}/`, this.getPosts)
      .get(`${this.route}/:id`, this.getPost)
      .put(
        `${this.route}/:id`,
        validationMiddleware(UpdatePostDTO),
        this.updatePost,
      )
      .delete(`${this.route}/:id`, this.deletePost);
  }

  private createPost(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) {
    return this.post
      .create(request.body)
      .then((res) => response.json(res))
      .catch((error) => next(error));
  }

  private async getPosts(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) {
    try {
      console.log(request.query);
      const { page, rowsPerPage } = getParsedPaginationData(request.query);
      const totalItems = await this.post.find().count();
      const totalPages = totalItems / rowsPerPage;
      console.log({ page, rowsPerPage });
      return this.post
        .find()
        .skip((page - 1) * rowsPerPage)
        .limit(rowsPerPage)
        .lean()
        .then((res) =>
          response.json({
            pagination: {
              count: res.length,
              currentPage: page,
              nextPage: page + 1 > totalPages ? null : page + 1,
              totalItems,
              totalPages,
              rowsPerPage,
            },
            items: res,
          }),
        );
    } catch (error) {
      next(error);
    }
  }

  private async getPost(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const id = request.params.id;
      const post = await this.post.findById(id).lean();
      if (post) {
        return response.json(post);
      }
      next(new NotFoundException('The post you are looking for is not found.'));
    } catch (error) {
      if (error.name === 'CastError') {
        // Handle ID cast error
        next(new InvalidIdExeption());
      } else {
        next(new InternalServerError());
        // Handle other errors
        console.error(error);
      }
    }
  }

  private updatePost(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) {
    return this.post
      .findOneAndUpdate({ _id: request.params.id }, request.body, { new: true })
      .then((result) => {
        return response.json({ result });
      })
      .catch((error) => {
        next(new InternalServerError());
      });
  }

  private async deletePost(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const result = await this.post.findByIdAndDelete(request.params.id);
      console.log({ result });
      if (!result) {
        return next(
          new NotFoundException(`Post with ${request.params.id} not found.`),
        );
      }
      return response.status(httpStatus.OK).json({
        sucess: true,
        message: `Post deleted with ${request.params.id}`,
      });
    } catch (error) {
      if (error.name === 'CastError') {
        // Handle ID cast error
        next(new InvalidIdExeption());
      } else {
        next(new InternalServerError());
        // Handle other errors
        console.error(error);
      }
    }
  }
}
