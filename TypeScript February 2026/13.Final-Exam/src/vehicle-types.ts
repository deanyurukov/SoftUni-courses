import { Vehicle, VehicleCategory, WithId } from "./models";

abstract class BaseVehicle implements Vehicle {
    public id: number;
    public model: string;
    public engineCC: number;
    public category: VehicleCategory;
    protected _baseRentalPrice?: number;

    constructor(id: number, model: string, engineCC: number, category: VehicleCategory, baseRentalPrice?: number) {
        this.id = id;
        this.model = model;
        this.engineCC = engineCC;
        this.category = category;
        this._baseRentalPrice = baseRentalPrice;
    }

    get baseRentalPrice(): number | undefined {
        return this._baseRentalPrice;
    }

    // @ApplyInsurance 
    get insuredRentalPrice(): number | undefined {
        return this._baseRentalPrice;
    }

    abstract getMaintenanceCost(): number;
}

export class Sedan extends BaseVehicle {
    public passengerCount: number;

    constructor(id: number, model: string, engineCC: number, passengerCount: number) {
        super(id, model, engineCC, VehicleCategory.Sedan);
        this.passengerCount = passengerCount;
    }

    getMaintenanceCost(): number {
        return (this.engineCC * 0.03) + (this.passengerCount * 15);
    }
}

export class SUV extends BaseVehicle {
    public fourWheelDrive: boolean;

    constructor(id: number, model: string, engineCC: number, fourWheelDrive: boolean, baseRentalPrice: number) {
        super(id, model, engineCC, VehicleCategory.SUV, baseRentalPrice);
        this.fourWheelDrive = fourWheelDrive;
    }

    getMaintenanceCost(): number {
        return (this.engineCC * 0.05) + (this.fourWheelDrive ? 200 : 0);
    }
}

export class Truck extends BaseVehicle {
    public payloadTons: number;

    constructor(id: number, model: string, engineCC: number, payloadTons: number, baseRentalPrice: number) {
        super(id, model, engineCC, VehicleCategory.Truck, baseRentalPrice);
        this.payloadTons = payloadTons;
    }

    getMaintenanceCost(): number {
        return (this.engineCC * 0.07) + (this.payloadTons * 50);
    }
}

export function findItemById<T extends WithId>(items: T[], id: number): T | undefined {
    const item: T | undefined = items.find((item: T) => item.id === id);
    return item;
}