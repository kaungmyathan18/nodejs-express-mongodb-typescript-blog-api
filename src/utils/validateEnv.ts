import { cleanEnv, num, str } from "envalid";

export function validateEnv() {
    cleanEnv(process.env, {
        PORT:num(),
        NODE_ENV:str({ choices: ['development', 'test', 'production', 'staging']}),
    })
}