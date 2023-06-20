import { InternalServerError } from '@exceptions/InternalServerError';
import { InvalidIdExeption } from '@exceptions/invalidId.exception';
import NotFoundException from '@exceptions/notFound.exception';
import { Controller } from '@interfaces/controller.interface';
import { AuthenticationMiddleware } from '@middlewares/authentication.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import { getParsedPaginationData } from '@utils/functions';
import * as express from 'express';
import httpStatus from 'http-status';
import { CreatePostDTO } from './dto/create-post.dto';
import { UpdatePostDTO } from './dto/update-post.dto';
import { postModel } from './models/post.model';

export class PostController extends Controller {
  private post = postModel;
  constructor() {
    super();
    this.route = '/v1/posts';
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
      .use(AuthenticationMiddleware.loginRequired)
      .post('/', validationMiddleware(CreatePostDTO), this.createPost)
      .get(`/`, this.getPosts)
      .get(`/:id`, this.getPost)
      .put(`/:id`, validationMiddleware(UpdatePostDTO), this.updatePost)
      .delete(`/:id`, this.deletePost);
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
      const { page, rowsPerPage, searchKeywords } = getParsedPaginationData(
        request.query,
      );
      const filter =
        searchKeywords.trim().length === 0
          ? {}
          : { $text: { $search: searchKeywords } };

      const totalItems = await this.post.find(filter).count();
      const totalPages = Math.ceil(totalItems / rowsPerPage);
      return this.post
        .find(filter)
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
            message: response.__('Success'),
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
      next(
        new NotFoundException(
          response.__('The post you are looking for is not found.'),
        ),
      );
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
