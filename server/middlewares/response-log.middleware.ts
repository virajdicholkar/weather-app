import { Response } from "express";
import { ObjectId } from "mongodb";
import { ResponseLogInterface, ResponseLogModel } from './../modules/response-log/response-log.model';
export const logResponse = (req, res: Response, next) => {
    const request = new ObjectId(req['reqLogId']);
    const status = res.statusCode;
    const statusMessage = res.statusMessage;
    const headers = res.getHeaders()
    const responseLog: ResponseLogInterface = {
        request,
        status,
        statusMessage,
        headers
    };
    ResponseLogModel.create(responseLog);
    next()
}
