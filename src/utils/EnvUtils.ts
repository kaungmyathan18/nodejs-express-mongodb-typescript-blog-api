export class EnvUtils {
  static get(name: string) {
    return process.env[name];
  }
}
