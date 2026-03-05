type CarBody = {
    material: string, 
    state: string 
}

type Tires = {
    airPressure: number,
    condition: string
}

type Engine = {
    horsepower: number,
    oilDensity: number
}

type CarDetails = {
    partName: string,
    runDiagnostics: () => string
}

function runDiagnostics(this: CarDetails) {
    return this.partName;
}

function carDiagnostics(carBody: CarBody & CarDetails, tires: Tires & CarDetails, engine: Engine & CarDetails) {
    console.log(carBody.runDiagnostics());
    console.log(tires.runDiagnostics());
    console.log(engine.runDiagnostics());
}

carDiagnostics({ material: 'aluminum', state: 'scratched', partName: 'Car Body', runDiagnostics }, { airPressure: 30, condition: 'needs change', partName: 'Tires', runDiagnostics }, { horsepower: 300, oilDensity: 780, partName: 'Engine', runDiagnostics });