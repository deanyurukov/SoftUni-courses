export enum ContentType {
    Series,
    Movie,
    Documentary
}

export interface BaseContent {
    id: number;
    title: string;
    releaseDate: Date;
    type: ContentType;
}

export interface Viewer {
    name: string;
    email: string;
}

export interface idOnly {
    id: number;
}