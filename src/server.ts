import 'dotenv/config';
import { App } from '@config/app';
import i18n from '@config/i18n.config';
import { PostController } from '@features/posts/post.controller';
import { UserController } from '@features/users/users.controller';
import { validateEnv } from '@utils/validateEnv';
i18n.setLocale('en');
validateEnv();

const app = new App([new PostController(), new UserController()]);
app.run();
