import { Track, TrackDocument } from "./schemas/track.schema";
import { Model, Types, ObjectId } from "mongoose";
import { Comment, CommentDocument } from "./schemas/comment.schema";
import { CreateTrackDto } from "./dto/Create-track.dto";
import { CreateCommentDto } from "./dto/Create-comment.dto";
import { FileService } from "src/file/file.service";
export declare class TrackService {
    private TrackModel;
    private CommentModel;
    private fileService;
    constructor(TrackModel: Model<TrackDocument>, CommentModel: Model<CommentDocument>, fileService: FileService);
    create(dto: CreateTrackDto, picture: any, audio: any): Promise<Track>;
    getAll(count?: number, offset?: number): Promise<Track[]>;
    getOne(id: ObjectId): Promise<Track>;
    delete(id: ObjectId): Promise<Types.ObjectId>;
    addComment(dto: CreateCommentDto): Promise<Comment>;
    listen(id: ObjectId): Promise<void>;
    search(query: string): Promise<Track[]>;
}
