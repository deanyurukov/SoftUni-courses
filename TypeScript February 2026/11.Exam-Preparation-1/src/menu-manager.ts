import { BaseMenuItem, findItemById } from "./menu-item-types";
import { Client, MenuItemType } from "./models";

export class MenuManager {
    private menuItems: BaseMenuItem[] = [];
    private clients: Map<number, Client[]> = new Map();

    public addMenuItem(item: BaseMenuItem): string {
        this.menuItems.push(item);
        this.clients.set(item.id, []);
        return `Menu item "${item.name}" (ID: ${item.id}) has been added.`;
    }

    public registerClient(itemId: number, client: Client): string {
        if (!this.clients.has(itemId)) {
            return `ERROR: Menu item with ID ${itemId} not found.`;
        }
        
        const clientsToModify: Client[] = this.clients.get(itemId)!;
        clientsToModify.push(client);
        this.clients.set(itemId, clientsToModify);
        return `Client ${client.name} registered for menu item ID ${itemId} successfully.`;
    }

    public listAllItems(): string[] {
        const result: string[] = ["--- List of All Menu Items ---"];

        this.menuItems.forEach(item => {
            result.push(`[${MenuItemType[item.type].toUpperCase()}] ${item.name} (${item.weightGrams}g) - Calories: ${item.getCalories().toFixed(2)}`);
        });

        return result;
    }

    public findMenuItem(itemId: number): BaseMenuItem | undefined {
        return findItemById(this.menuItems, itemId);
    }
}