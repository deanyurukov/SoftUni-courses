import { MenuItem, MenuItemType, WithId } from "./models";

export abstract class BaseMenuItem implements MenuItem {
    public id: number;
    public name: string;
    public weightGrams: number;
    public type: MenuItemType;
    protected _basePrice?: number;

    constructor(id: number, name: string, weightGrams: number, type: MenuItemType) {
        this.id = id;
        this.name = name;
        this.weightGrams = weightGrams;
        this.type = type;
    }

    abstract getCalories(): number;

    get basePrice(): number | undefined {
        return this._basePrice;
    }

    // @ConvertToEuro 
    get finalPrice(): number | undefined {
        return this._basePrice;
    }
}

export class WelcomeSnack extends BaseMenuItem {
    hasCream: boolean;
    
    constructor(id: number, name: string, weightGrams: number, hasCream: boolean) {
        super(id, name, weightGrams, MenuItemType.WelcomeSnack);
        this.hasCream = hasCream;
    }

    getCalories(): number {
        return (this.weightGrams * 1.2) + (this.hasCream ? 20 : 0);
    }
}

export class MainCourse extends BaseMenuItem {
    fatGrams: number;
    
    constructor(id: number, name: string, weightGrams: number, fatGrams: number, basePrice: number) {
        super(id, name, weightGrams, MenuItemType.MainCourse);
        this.fatGrams = fatGrams;
        this._basePrice = basePrice;
    }

    getCalories(): number {
        return (this.weightGrams * 2.0) + (this.fatGrams * 3);
    }
}

export class Dessert extends BaseMenuItem {
    hasSugar: boolean;
    
    constructor(id: number, name: string, weightGrams: number, hasSugar: boolean, basePrice: number) {
        super(id, name, weightGrams, MenuItemType.Dessert);
        this.hasSugar = hasSugar;
        this._basePrice = basePrice;
    }

    getCalories(): number {
        return (this.weightGrams * 2.5) + (this.hasSugar ? 100 : 0);
    }
}

export function findItemById<T extends WithId>(items: T[], id: number): T | undefined {
    const item: T | undefined = items.find((item: T) => item.id === id);
    return item;
}