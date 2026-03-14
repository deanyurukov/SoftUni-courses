class Vehicle {
    protected brand: string;

    constructor(brand: string) {
        this.brand = brand;
    }

    drive(): string {
        return `Driving a ${this.brand}`;
    }
}

class Car extends Vehicle {
    private model: string;

    constructor(brand: string, model: string) {
        super(brand);
        this.model = model;
    }

    override drive(): string {
        return `Driving a ${this.brand} ${this.model}`;
    }
}

const car = new Car("Toyota", "Corolla");
console.log(car.drive());