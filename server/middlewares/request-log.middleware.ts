import { ObjectId } from "mongodb";
import { RequestLogModel, RequestLogInterface } from './../modules/request-log/request-log.model';

export const logRequest = async (req, res, next) => {
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
        cookies: req.cookies
    }
    const reqLogResult = await RequestLogModel.create(newRequestLog);
    next()
}