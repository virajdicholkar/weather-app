import { ObjectId } from 'mongodb';
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
export interface ResponseLogInterface {
    request: ObjectId,
    status: Number,
    statusMessage: String,
    headers: any
}

export const ResponseLogSchema = new Schema({
    request: {
        type: Schema.Types.ObjectId,
        ref: 'Request'
    },
    status: Number,
    statusMessage: String,
    headers: [{}]
}, {
    timestamps: true
});

export const ResponseLogModel = mongoose.model('ResponseLog', ResponseLogSchema);
