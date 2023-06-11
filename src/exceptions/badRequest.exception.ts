import httpStatus from "http-status";
import HttpException from "./http.exception";

export class BadRequestException extends HttpException {
    constructor(message:string) {
        super(httpStatus.BAD_REQUEST,message);
    }
}