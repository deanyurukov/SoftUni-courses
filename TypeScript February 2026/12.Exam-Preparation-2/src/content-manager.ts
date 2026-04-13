import { DetailedContent, findItemById } from './content-types';
import { NotifyOnSuccess } from './decorators';
import { Viewer } from './models';

export class ContentManager {
    private contentItems: DetailedContent[] = [];
    private viewers: Map<number, Viewer[]> = new Map();

    public addContent(item: DetailedContent): string {
        this.contentItems.push(item);
        this.viewers.set(item.id, []);
        return `Content "${item.title}" (ID: ${item.id}) has been added.`;
    }

    @NotifyOnSuccess("Email")
    public markAsWatched(contentId: number, viewer: Viewer): string {
        const viewersToModify = this.viewers.get(contentId);
        
        if (!viewersToModify) {
            return `ERROR: Content with ID ${contentId} not found.`;
        }

        viewersToModify.push(viewer);
        this.viewers.set(contentId, viewersToModify);
        return `Viewer ${viewer.name} marked content ID ${contentId} as watched.`;
    }

    public listAllContent(): string[] {
        const result: string[] = [];

        this.contentItems.forEach((item: DetailedContent) => {
            result.push(item.getDetails());
        });

        return result;
    }

    findContent(contentId: number): DetailedContent | undefined {
        return findItemById(this.contentItems, contentId);
    }
}