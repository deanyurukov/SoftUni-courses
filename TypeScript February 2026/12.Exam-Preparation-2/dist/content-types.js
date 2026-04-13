"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Series = exports.Movie = exports.DetailedContent = void 0;
exports.findItemById = findItemById;
const models_1 = require("./models");
class DetailedContent {
    id;
    title;
    releaseDate;
    _type;
    constructor(id, title, releaseDate, type) {
        this.id = id;
        this.title = title;
        this.releaseDate = releaseDate;
        this._type = type;
    }
    get type() {
        return this._type;
    }
}
exports.DetailedContent = DetailedContent;
class Movie extends DetailedContent {
    director;
    constructor(id, title, releaseDate, director) {
        super(id, title, releaseDate, models_1.ContentType.Movie);
        this.director = director;
    }
    getDetails() {
        return `[${models_1.ContentType[this.type].toUpperCase()}] "${this.title}" directed by ${this.director} (Released: ${this.releaseDate.toLocaleDateString()})`;
    }
}
exports.Movie = Movie;
class Series extends DetailedContent {
    platformUrl;
    constructor(id, title, releaseDate, platformUrl) {
        super(id, title, releaseDate, models_1.ContentType.Series);
        this.platformUrl = platformUrl;
    }
    getDetails() {
        return `[${models_1.ContentType[this.type].toUpperCase()}] "${this.title}" (Released: ${this.releaseDate.toLocaleDateString()}), available at: ${this.platformUrl}`;
    }
}
exports.Series = Series;
function findItemById(items, id) {
    const item = items.find((item) => item.id === id);
    return item;
}
