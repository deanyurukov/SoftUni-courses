import { CriticalStrike } from "./decorators";
import { Hero, HeroRole, Weapon, WithId } from "./models";

export class GuildStash<T extends WithId> {
    private records: T[] = [];

    public add(item: T): void {
        this.records.push(item);
    }

    public take(id: number): T | undefined {
        const item: T | undefined = this.records.find((obj: T) => obj.id === id);

        if (!item) {
            return undefined;
        }

        this.records.splice(this.records.indexOf(item), 1);

        return item;
    }

    public getAll(): T[] {
        return [...this.records];
    }
}

export abstract class BaseHero implements Hero {
    public id: number;
    public name: string;
    public level: number;
    public role: HeroRole;
    public weapons: Weapon[];

    constructor(id: number, name: string, level: number, role: HeroRole) {
        this.id = id;
        this.name = name;
        this.level = level;
        this.role = role;
        this.weapons = [];
    }

    abstract calculateStamina(): number;
    abstract attack(): number;
}

export class Warrior extends BaseHero {
    public strength: number;

    constructor(id: number, name: string, level: number, strength: number) {
        super(id, name, level, HeroRole.Warrior);
        this.strength = strength;
    }

    calculateStamina(): number {
        return (this.level * 10) + (this.strength * 5);
    }

    @CriticalStrike
    attack(): number {
        return this.strength * 2;
    }
}

export class Mage extends BaseHero {
    public mana: number;

    constructor(id: number, name: string, level: number, mana: number) {
        super(id, name, level, HeroRole.Mage);
        this.mana = mana;
    }

    calculateStamina(): number {
        return (this.level * 5) + (this.mana * 2);
    }

    attack(): number {
        return this.mana * 2;
    }
}

export class Archer extends BaseHero {
    public agility: number;

    constructor(id: number, name: string, level: number, agility: number) {
        super(id, name, level, HeroRole.Archer);
        this.agility = agility;
    }

    calculateStamina(): number {
        return (this.level * 8) + (this.agility * 4);
    }

    attack(): number {
        return this.agility * 2;
    }
}