import { BadRequestException } from "@exceptions/badRequest.exception";
import NotFoundException from "@exceptions/notFound.exception";
import { Controller } from "@interfaces/controller.interface";
import * as express from "express";

const tmpPosts = [
    {
        name:"some name",
        id:"some id"
    }
]

export class PostController extends Controller {
    constructor() {
        super();
        this.route="/posts";
        this.router = express.Router();
        this.initializeRoutes();
    }
    initializeRoutes () {
        this.router
        .get(this.route,this.getPosts)
        .get(`${this.route}/:id`,this.getPost)
        .put(`${this.route}/:id`,this.updatePost)
        .delete(`${this.route}/:id`,this.deletePost)
    }

    private getPosts(request:express.Request,response:express.Response) {
        return response.json(tmpPosts)
    }

    private getPost(request:express.Request,response:express.Response) {
        const id:string = request.params.id;
        const post = tmpPosts.find(post=>post.id===id);
        if(post) {
            return response.json(post);
        }
        throw new NotFoundException("The post you are looking for is not found.")
    }

    private updatePost(request:express.Request,response:express.Response) {
        throw new BadRequestException("not implemented")
    }

    private deletePost(request:express.Request,response:express.Response) {
        throw new BadRequestException("not implemented")
    }
}