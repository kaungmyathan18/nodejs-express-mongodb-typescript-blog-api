import * as HttpStatus from "http-status";
import HttpException from "./http.exception";

class NotFoundException extends HttpException {
    constructor(message:string) {
        super(HttpStatus.NOT_FOUND,message);
    }
}

export default NotFoundException;