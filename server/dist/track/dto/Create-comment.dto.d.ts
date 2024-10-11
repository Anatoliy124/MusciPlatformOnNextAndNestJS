import { ObjectId } from "mongodb";
export declare class CreateCommentDto {
    readonly userName: string;
    readonly text: string;
    readonly TrackId: ObjectId;
}
