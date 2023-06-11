import "dotenv/config";
import { App } from "@config/app";
import { PostController } from "@features/posts/post.controller";
import { validateEnv } from "@utils/validateEnv";

validateEnv();

const app = new App([
    new PostController()
]);

app.listen();