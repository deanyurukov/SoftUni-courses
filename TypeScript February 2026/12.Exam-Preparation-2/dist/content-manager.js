"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentManager = void 0;
const content_types_1 = require("./content-types");
const decorators_1 = require("./decorators");
class ContentManager {
    contentItems = [];
    viewers = new Map();
    addContent(item) {
        this.contentItems.push(item);
        this.viewers.set(item.id, []);
        return `Content "${item.title}" (ID: ${item.id}) has been added.`;
    }
    markAsWatched(contentId, viewer) {
        const viewersToModify = this.viewers.get(contentId);
        if (!viewersToModify) {
            return `ERROR: Content with ID ${contentId} not found.`;
        }
        viewersToModify.push(viewer);
        this.viewers.set(contentId, viewersToModify);
        return `Viewer ${viewer.name} marked content ID ${contentId} as watched.`;
    }
    listAllContent() {
        const result = [];
        this.contentItems.forEach((item) => {
            result.push(item.getDetails());
        });
        return result;
    }
    findContent(contentId) {
        return (0, content_types_1.findItemById)(this.contentItems, contentId);
    }
}
exports.ContentManager = ContentManager;
__decorate([
    (0, decorators_1.NotifyOnSuccess)("Email")
], ContentManager.prototype, "markAsWatched", null);
