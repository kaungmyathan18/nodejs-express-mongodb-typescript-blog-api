import httpStatus from "http-status";
import HttpException from "./http.exception";

export class BadRequestException extends HttpException {
    constructor(message:any) {
        super(httpStatus.BAD_REQUEST,message);
    }
}