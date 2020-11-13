import { Request } from "express";
import { ObjectId } from "mongodb";
import { RequestLogModel, RequestLogInterface } from './../modules/request-log/request-log.model';

export const logRequest = async (req: Request, res, next) => {
    const newRequestLog: RequestLogInterface = {
        headers: req.headers,
        hostname: req.hostname,
        _id: new ObjectId(),
        ip: req.ip,
        method: req.method,
        origin: req.originalUrl,
        path: req.path,
        protocol: req.protocol,
        subdomains: req.subdomains,
        cookies: req.cookies,
        query: req.query,
        body: req.body,
        params: req.params
    }
    console.log('newRequestLog', newRequestLog)
    const reqLogResult = await RequestLogModel.create(newRequestLog);
    req['reqLogId'] = reqLogResult._id;
    next()
}