"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackService = void 0;
const common_1 = require("@nestjs/common");
const track_schema_1 = require("./schemas/track.schema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const comment_schema_1 = require("./schemas/comment.schema");
const file_service_1 = require("../file/file.service");
let TrackService = class TrackService {
    constructor(TrackModel, CommentModel, fileService) {
        this.TrackModel = TrackModel;
        this.CommentModel = CommentModel;
        this.fileService = fileService;
    }
    async create(dto, picture, audio) {
        const audioPath = this.fileService.createFile(file_service_1.FileType.AUDIO, audio);
        const picturePath = this.fileService.createFile(file_service_1.FileType.IMAGE, picture);
        const track = await this.TrackModel.create({ ...dto, listens: 0, audio: audioPath, picture: picturePath });
        return track;
    }
    async getAll(count = 10, offset = 0) {
        const tracks = await this.TrackModel.find().skip(Number(offset)).limit(Number(count));
        return tracks;
    }
    async getOne(id) {
        const track = (await this.TrackModel.findById(id)).populate('comments');
        return track;
    }
    async delete(id) {
        const track = await this.TrackModel.findByIdAndDelete(id).exec();
        if (!track) {
            throw new Error(`Трек с id ${id} не найден для удаления`);
        }
        return track._id;
    }
    async addComment(dto) {
        const track = await this.TrackModel.findById(dto.TrackId);
        const comment = await this.CommentModel.create({ ...dto });
        track.comments.push(comment._id);
        await track.save();
        return comment;
    }
    async listen(id) {
        const track = await this.TrackModel.findById(id);
        track.listens += 1;
        track.save();
    }
    async search(query) {
        const tracks = await this.TrackModel.find({
            name: { $regex: new RegExp(query, 'i') }
        });
        return tracks;
    }
};
exports.TrackService = TrackService;
exports.TrackService = TrackService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(track_schema_1.Track.name)),
    __param(1, (0, mongoose_1.InjectModel)(comment_schema_1.Comment.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        file_service_1.FileService])
], TrackService);
//# sourceMappingURL=track.service.js.map