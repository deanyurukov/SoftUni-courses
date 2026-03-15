abstract class Shape {
    public color: string;

    constructor(color: string) {
        this.color = color;
    }

    abstract getArea(): number;
}

class Circle extends Shape {
    public radius: number;

    constructor(color: string, radius: number) {
        super(color);
        this.radius = radius;
    }

    getArea(): number {
        return (Math.pow(this.radius, 2) * Math.PI);
    }
}

class Rectangle extends Shape {
    public sideA: number;
    public sideB: number;

    constructor(color: string, sideA: number, sideB: number) {
        super(color);
        this.sideA = sideA;
        this.sideB = sideB;
    }

    getArea(): number {
        return this.sideA * this.sideB;
    }
}

const circle = new Circle("red", 5);
console.log(circle.getArea());
const rectangle = new Rectangle("blue", 4, 6);
console.log(rectangle.getArea());