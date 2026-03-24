function validateAge(target: any, key: string, descriptor: PropertyDescriptor) {
    let setter = descriptor.set;

    descriptor.set = function (args: number) {
        if (args < 1 || args > 200) throw new Error("Age must be between 1 and 200");
        setter?.call(this, args);
    }

    return descriptor;
}

class Age {
    private _age!: number;

    constructor(age: number) {
        this.age = age;
    }

    @validateAge
    set age(val: number) { this._age = val; }
    get age() { return this._age; }
}

let ageVal = new Age(10);
ageVal.age = -10;