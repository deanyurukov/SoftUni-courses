import { BaseContent, ContentType, idOnly } from "./models";

abstract class DetailedContent implements BaseContent {
    public readonly id: number;
    public readonly title: string;
    public readonly releaseDate: Date;
    private _type: ContentType;

    constructor(id: number, title: string, releaseDate: Date, type: ContentType) {
        this.id = id;
        this.title = title;
        this.releaseDate = releaseDate;
        this._type = type;
    }

    get type(): ContentType {
        return this._type;
    }

    abstract getDetails(): string;
}

export class Movie extends DetailedContent {
    public readonly director: string;

    constructor(id: number, title: string, releaseDate: Date, director: string) {
        super(id, title, releaseDate, ContentType.Movie);
        this.director = director;
    }

    getDetails(): string {
        return `[${ContentType[this.type]}] "${this.title}" directed by ${this.director} (Released: ${this.releaseDate.toLocaleDateString()})`;
    }
}

export class Series extends DetailedContent {
    public readonly platformUrl: string;

    constructor(id: number, title: string, releaseDate: Date, platformUrl: string) {
        super(id, title, releaseDate, ContentType.Series);
        this.platformUrl = platformUrl;
    }

    getDetails(): string {
        return `[${ContentType[this.type]}] "${this.title}" (Released: ${this.releaseDate.toLocaleDateString()}), available at: ${this.platformUrl}`;
    }
}

export function findItemById<T extends idOnly>(items: T[], id: number): T | undefined {
    const item: T | undefined = items.find((item: T) => item.id === id);
    return item;
}