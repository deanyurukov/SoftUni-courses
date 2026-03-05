type Names = {
    fName: string,
    lName: string,
    age: number,
    getPersonInfo(): string
}

type Locations = {
    city: string,
    street: string,
    number: number,
    postalCode: number,
    getAddressInfo(): string
}

function createCombinedFunction(names: Names, locations: Locations) {
    function printInfo(params: Names & Locations): string {
        return `Hello, ${params.getPersonInfo()} from ${params.getAddressInfo()}`; 
    }

    return printInfo;
}

let names = { fName: 'John', lName: 'Doe', age: 22, getPersonInfo() { return `${this.fName} ${this.lName}, age ${this.age}` } };
let locations = { city:'Boston', street: 'Nowhere street', number: 13, postalCode: 51225, getAddressInfo() { return `${this.street} ${this.number}, ${this.city} ${this.postalCode}`} };
let combinedFunction = createCombinedFunction(names, locations);
let combinedPerson = Object.assign({}, names, locations);
console.log(combinedFunction(combinedPerson));