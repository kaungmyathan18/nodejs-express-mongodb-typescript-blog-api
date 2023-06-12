import { CreatePostDTO } from './dto/create-post.dto';
import { postModel } from './models/post.model';

export class PostServices {
  private postRepository = postModel;
  constructor() {
    this.createPost = this.createPost.bind(this);
    this.getPosts = this.getPosts.bind(this);
    this.getPost = this.getPost.bind(this);
    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
  }

  createPost(payload: CreatePostDTO) {
    return this.postRepository.create(payload).then((res) => res);
  }

  getPosts() {
    return this.postRepository.find();
  }
  getPost() {
    return this.postRepository.find();
  }
  updatePost() {
    return this.postRepository.find();
  }
  deletePost() {
    return this.postRepository.find();
  }
}
