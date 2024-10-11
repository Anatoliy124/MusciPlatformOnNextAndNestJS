export declare enum FileType {
    AUDIO = "audio",
    IMAGE = "image"
}
export declare class FileService {
    createFile(type: FileType, file: any): string;
    removeFile(FileName: string): void;
}
