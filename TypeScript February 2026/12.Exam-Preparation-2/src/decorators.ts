import { Viewer } from "./models";

export function NotifyOnSuccess(notificationType: 'Email' | 'Push') {
    return function(target: object, key: string, descriptor: PropertyDescriptor) {
        const method = descriptor.value;

        descriptor.value = function(contentId: number, viewer: Viewer): string {
            const value = method.call(this, contentId, viewer);
            
            if (typeof value === "string" && !value.startsWith("ERROR")) {
                console.log(`[NOTIFY] Sending ${notificationType} notification for successful action "${key}".`);
            }

            return method.call(this, contentId, viewer);
        }
    }
};