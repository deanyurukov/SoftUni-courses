"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotifyOnSuccess = NotifyOnSuccess;
function NotifyOnSuccess(notificationType) {
    return function (target, key, descriptor) {
        const method = descriptor.value;
        descriptor.value = function (contentId, viewer) {
            const value = method.call(this, contentId, viewer);
            if (typeof value === "string" && !value.startsWith("ERROR")) {
                console.log(`[NOTIFY] Sending ${notificationType} notification for successful action "${key}".`);
            }
            return method.call(this, contentId, viewer);
        };
    };
}
;
