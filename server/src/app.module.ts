import { Module } from "@nestjs/common";
import { TrackModule } from "./track/track.module";
import { MongooseModule } from "@nestjs/mongoose";
import { FileService } from "./file/file.service";
import { FileModule } from "./file/file.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from "path";

@Module({
    imports: [
        ServeStaticModule.forRoot({rootPath: path.resolve(__dirname,  'static')}),
        MongooseModule.forRoot('mongodb+srv://anatoliyrodionov27:nm5mOTLvdkOTEezX@cluster0.foehm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
        TrackModule,
        FileModule,
        FileService
    ]
})

export class AppModule {};