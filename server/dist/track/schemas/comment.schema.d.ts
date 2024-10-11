import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Track } from './track.schema';
export type CommentDocument = HydratedDocument<Comment>;
export declare class Comment {
    username: string;
    text: string;
    track: Track;
}
export declare const CommentSchema: mongoose.Schema<Comment, mongoose.Model<Comment, any, any, any, mongoose.Document<unknown, any, Comment> & Comment & {
    _id: mongoose.Types.ObjectId;
} & {
    __v?: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Comment, mongoose.Document<unknown, {}, mongoose.FlatRecord<Comment>> & mongoose.FlatRecord<Comment> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v?: number;
}>;
