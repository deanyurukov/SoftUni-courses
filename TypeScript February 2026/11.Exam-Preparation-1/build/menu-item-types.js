"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dessert = exports.MainCourse = exports.WelcomeSnack = exports.BaseMenuItem = void 0;
exports.findItemById = findItemById;
const models_1 = require("./models");
class BaseMenuItem {
    constructor(id, name, weightGrams, type) {
        this.id = id;
        this.name = name;
        this.weightGrams = weightGrams;
        this.type = type;
    }
    get basePrice() {
        return this._basePrice;
    }
    // @ConvertToEuro 
    get finalPrice() {
        return this._basePrice;
    }
}
exports.BaseMenuItem = BaseMenuItem;
class WelcomeSnack extends BaseMenuItem {
    constructor(id, name, weightGrams, hasCream) {
        super(id, name, weightGrams, models_1.MenuItemType.WelcomeSnack);
        this.hasCream = hasCream;
    }
    getCalories() {
        return (this.weightGrams * 1.2) + (this.hasCream ? 20 : 0);
    }
}
exports.WelcomeSnack = WelcomeSnack;
class MainCourse extends BaseMenuItem {
    constructor(id, name, weightGrams, fatGrams, basePrice) {
        super(id, name, weightGrams, models_1.MenuItemType.MainCourse);
        this.fatGrams = fatGrams;
        this._basePrice = basePrice;
    }
    getCalories() {
        return (this.weightGrams * 2.0) + (this.fatGrams * 3);
    }
}
exports.MainCourse = MainCourse;
class Dessert extends BaseMenuItem {
    constructor(id, name, weightGrams, hasSugar, basePrice) {
        super(id, name, weightGrams, models_1.MenuItemType.Dessert);
        this.hasSugar = hasSugar;
        this._basePrice = basePrice;
    }
    getCalories() {
        return (this.weightGrams * 2.5) + (this.hasSugar ? 100 : 0);
    }
}
exports.Dessert = Dessert;
// Generic Function: findItemById<T>
// Implement a reusable generic function to locate an item in a collection.
// •	Constraint: The generic type T must extend the WithId interface (from models.ts) to ensure the object has an id.
// •	Arguments:
// o	items: An array of items of type T
// o	id: The numeric ID to search for
// •	Returns: The first item found with the matching ID, or undefined.
function findItemById(items, id) {
    const item = items.find((item) => item.id === id);
    return item;
}
