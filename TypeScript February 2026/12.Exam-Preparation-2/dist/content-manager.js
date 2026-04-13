"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentManager = void 0;
const content_types_1 = require("./content-types");
class ContentManager {
    contentItems = [];
    viewers = new Map();
    addContent(item) {
        this.contentItems.push(item);
        this.viewers.set(item.id, []);
        return `Content "${item.title}" (ID: ${item.id}) has been added.`;
    }
    // @NotifyOnSuccess
    markAsWatched(contentId, viewer) {
        const viewersToModify = this.viewers.get(contentId);
        if (!viewersToModify) {
            return `Error: Content with ID ${contentId} not found.`;
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
// •	findContent(contentId: number):
// o	Uses the generic search function to locate content by ID.
