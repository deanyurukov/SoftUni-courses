"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const menu_manager_1 = require("./menu-manager");
const menu_item_types_1 = require("./menu-item-types");
const menuManager = new menu_manager_1.MenuManager();
// --- Test 1: Add Menu Items ---
const welcomeSnack = new menu_item_types_1.WelcomeSnack(1, 'Garlic Bread', 50, true);
const mainCourse = new menu_item_types_1.MainCourse(2, 'Steak', 300, 20, 25);
const dessert = new menu_item_types_1.Dessert(3, 'Chocolate Cake', 150, true, 10);
console.log(menuManager.addMenuItem(welcomeSnack));
console.log(menuManager.addMenuItem(mainCourse));
console.log(menuManager.addMenuItem(dessert));
// --- Test 2: Register Clients ---
// const client1: Client = { name: 'Alice', phone: '123456' };
// const client2: Client = { name: 'Bob', phone: '654321' };
// console.log(menuManager.registerClient(2, client1));
// console.log(menuManager.registerClient(3, client2));
// console.log(menuManager.registerClient(5, client2));
// --- Test 3: List All Menu Items ---
// console.log(menuManager.listAllItems().join('\n'));
// --- Test 4: Find Menu Item by ID ---
const foundItem = menuManager.findMenuItem(2);
if (foundItem) {
    console.log(`Found item: ${foundItem.name}, Calories: ${foundItem.getCalories()}`);
}
else {
    console.log('Item not found');
}
// --- Test 5: Check Decorated finalPrice ---
// console.log(`MainCourse base price: ${mainCourse.basePrice} BGN`);
// console.log(`MainCourse final price in EUR: ${mainCourse.finalPrice} EUR`);
// console.log(`WelcomeSnack final price (should be undefined): ${welcomeSnack.finalPrice}`);
// export {
//     MenuManager,
//     WelcomeSnack,
//     MainCourse,
//     Dessert,
// };
