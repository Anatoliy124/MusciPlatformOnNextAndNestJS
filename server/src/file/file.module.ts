import { Module } from "@nestjs/common";
import { Model } from "mongoose";
import { FileService } from "./file.service";


@Module({
    providers: [FileService]
})

export class FileModule {}