import { BaseMenuItem } from "./menu-item-types";
import { Client } from "./models";

class MenuManager {
    private menuItems: BaseMenuItem[];
    private clients: Map<number, Client[]>;

    constructor() {
        this.menuItems = [];
        this.clients = new Map<number, Client[]>;
    }

    public addMenuItem(item: BaseMenuItem): string {
        this.menuItems.push(item);
        this.clients.set(item.id, []);
        return `Menu item "${item.name}" (ID: ${item.id}) has been added.`;
    }
}

// •	addMenuItem(item: BaseMenuItem): string:
// Behavior:
// o	Adds a menu item to the internal collection.
// o	Initializes an empty client list for that menu item ID.
// o	Return this exact string:
// "Menu item "{name}" (ID: {id}) has been added."

// •	registerClient(itemId: number, client: Client): string:
// Behavior:
// o	If no item exists with given id:
// "ERROR: Menu item with ID {itemId} not found."
// o	Otherwise add the client to the client list and return:
// "Client {clientName} registered for menu item ID {itemId} successfully."
// o	Duplicates are allowed.

// •	listAllItems (): string[]:
// Behavior:
// o	Returns an array of formatted lines
// 	The first line shows the following message:
// "--- List of All Menu Items ---"
// 	For each menu item:
// "[{TYPE}] {name} ({weight}g) - Calories: {calories}"
// Where:
// •	TYPE = MenuItemType[item.type].toUpperCase()
// •	calories formatted with two decimal places
// Example:
// [MAINCOURSE] Steak (300g) - Calories: 660.00

// •	findMenuItem(itemId: number): BaseMenuItem | undefined:
// o	Requirement: You must utilize the generic findItemById function internally to find the item within the menuItems array
// o	Returns the found item or undefined.