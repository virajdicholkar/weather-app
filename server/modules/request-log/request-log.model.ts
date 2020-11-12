import { ObjectID } from 'mongodb';
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface RequestLogInterface{
    _id?: ObjectID;
    origin: string;
    headers: any;
    method: string;
    ip: string;
    hostname: string;
    path?: string;
    protocol: string;
    subdomains?: string[];
    cookies?: any;
}

export const RequestLogSchema = new Schema({
    origin: {
        type: String,
        required: true
    },
    headers: {},
    method: {
        type: String,
        required: true
    },
    ip: {
        type: String,
    },
    hostname: {
        type: String
    },
    path: {
        type: String
    },
    protocol: {
        type: String
    },
    subdomains: [{
        type: String
    }],
    cookies: {}

}, {
    timestamps: true
});

export const RequestLogModel = mongoose.model('RequestLog', RequestLogSchema);
