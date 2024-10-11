import { Injectable, Query, UploadedFiles } from "@nestjs/common";
import { Track, TrackDocument } from "./schemas/track.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types, ObjectId, Schema } from "mongoose";
import { Comment, CommentDocument } from "./schemas/comment.schema";
import { CreateTrackDto } from "./dto/Create-track.dto";
import { CreateCommentDto } from "./dto/Create-comment.dto";
import { FileService, FileType } from "server/src/file/file.service";
import { off } from "process";
import { query } from "express";


@Injectable()
export class TrackService {

    constructor(@InjectModel(Track.name) private TrackModel: Model<TrackDocument>,
                @InjectModel(Comment.name) private CommentModel: Model<CommentDocument>,
                private fileService: FileService) {}

    async create(dto: CreateTrackDto, picture, audio): Promise<Track> {
        const audioPath = this.fileService.createFile(FileType.AUDIO, audio)
        const picturePath = this.fileService.createFile(FileType.IMAGE, picture)
        const track = await this.TrackModel.create({...dto, listens: 0, audio: audioPath, picture: picturePath})
        return track
    }

    async getAll(count = 10, offset = 0): Promise<Track[]> {
        const tracks = await this.TrackModel.find().skip(Number(offset)).limit(Number(count));
        return tracks;
    }

      async getOne(id: ObjectId): Promise<Track> {
        const track = (await this.TrackModel.findById(id)).populate('comments');
        return track;
    }

    async delete(id: ObjectId): Promise<Types.ObjectId> {
        const track = await this.TrackModel.findByIdAndDelete(id).exec();
        if (!track) {
            throw new Error(`Трек с id ${id} не найден для удаления`);
        }
        return track._id;
    }

    async addComment(dto: CreateCommentDto): Promise<Comment> {
        const track = await this.TrackModel.findById(dto.TrackId);
        const comment = await this.CommentModel.create({...dto})
        track.comments.push(comment._id)
        await track.save();
        return comment;
    }

    async listen(id: ObjectId) {
        const track = await this.TrackModel.findById(id);
        track.listens += 1;
        track.save()
        
    }

    async search(query: string): Promise<Track[]> {
        const tracks = await this.TrackModel.find({
            name: {$regex: new RegExp(query, 'i')}
        })
        return tracks;
    }

}