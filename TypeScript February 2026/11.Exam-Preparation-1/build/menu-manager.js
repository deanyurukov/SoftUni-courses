"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuManager = void 0;
const menu_item_types_1 = require("./menu-item-types");
const models_1 = require("./models");
class MenuManager {
    constructor() {
        this.menuItems = [];
        this.clients = new Map();
    }
    addMenuItem(item) {
        this.menuItems.push(item);
        this.clients.set(item.id, []);
        return `Menu item "${item.name}" (ID: ${item.id}) has been added.`;
    }
    registerClient(itemId, client) {
        if (!this.clients.has(itemId)) {
            return `ERROR: Menu item with ID ${itemId} not found.`;
        }
        const clientsToModify = this.clients.get(itemId);
        clientsToModify.push(client);
        this.clients.set(itemId, clientsToModify);
        return `Client ${client.name} registered for menu item ID ${itemId} successfully.`;
    }
    listAllItems() {
        const result = ["--- List of All Menu Items ---"];
        this.menuItems.forEach(item => {
            result.push(`[${models_1.MenuItemType[item.type].toUpperCase()}] ${item.name} (${item.weightGrams}g) - Calories: ${item.getCalories().toFixed(2)}`);
        });
        return result;
    }
    findMenuItem(itemId) {
        return (0, menu_item_types_1.findItemById)(this.menuItems, itemId);
    }
}
exports.MenuManager = MenuManager;
// •	findMenuItem(itemId: number): BaseMenuItem | undefined:
// o	Requirement: You must utilize the generic findItemById function internally to find the item within the menuItems array
// o	Returns the found item or undefined.
