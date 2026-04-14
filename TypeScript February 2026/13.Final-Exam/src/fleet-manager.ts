import { Driver, VehicleCategory } from "./models";
import { BaseVehicle, findItemById, Sedan, SUV, Truck } from "./vehicle-types";

export class FleetManager {
    private vehicles: BaseVehicle[] = [];
    private drivers: Map<number, Driver[]> = new Map();

    addVehicle(item: BaseVehicle): string {
        this.vehicles.push(item);
        this.drivers.set(item.id, []);
        return `Vehicle "${item.model}" (ID: ${item.id}) has been added.`;
    }

    assignDriver(vehicleId: number, driver: Driver): string {
        const driversToModify = this.drivers.get(vehicleId);

        if (!driversToModify) {
            return `ERROR: Vehicle with ID ${vehicleId} not found.`;
        }

        driversToModify.push(driver);
        this.drivers.set(vehicleId, driversToModify);
        return `Driver ${driver.name} assigned to vehicle ID ${vehicleId} successfully.`;
    }

    listAllVehicles(): string[] {
        const result: string[] = ["--- List of All Vehicles ---"];

        this.vehicles.forEach((vehicle: BaseVehicle) => {
            let specificDetail = "";

            if (vehicle.category === 0) {
                const sedan = vehicle as Sedan;
                specificDetail = `Passengers ${sedan.passengerCount}`;
            }
            else if (vehicle.category === 1) {
                const suv = vehicle as SUV;
                specificDetail = `4WD: ${suv.fourWheelDrive}`;
            }
            else if (vehicle.category === 2) {
                const truck = vehicle as Truck;
                specificDetail = `Payload ${truck.payloadTons}t`;
            }

            result.push(`[${VehicleCategory[vehicle.category].toUpperCase()}] ${vehicle.model} (${vehicle.engineCC}cc, ${specificDetail}) - Maintenance: ${vehicle.getMaintenanceCost().toFixed(2)}€`);
        });

        result.push("-----------------------------");

        return result;
    }

    findVehicle(vehicleId: number): BaseVehicle | undefined {
        return findItemById(this.vehicles, vehicleId);
    }
}