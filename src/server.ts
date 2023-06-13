import { App } from '@config/app';
import { PostController } from '@features/posts/post.controller';
import { UserController } from '@features/users/users.controller';
import { validateEnv } from '@utils/validateEnv';
import 'dotenv/config';

validateEnv();

const app = new App([new PostController(), new UserController()]);
app.run();
