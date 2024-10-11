import { ObjectId } from "mongodb"

export class CreateCommentDto {
    readonly userName: string;
    readonly text: string;
    readonly TrackId: ObjectId;
}