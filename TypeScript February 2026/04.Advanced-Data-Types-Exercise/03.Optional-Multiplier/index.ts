function optionalMultiplier(a?: string | number, b?: string | number, c?: string | number): number {
    if (typeof a === "string") {
        a = Number(a);
    }
    if (typeof b === "string") {
        b = Number(b);
    }
    if (typeof c === "string") {
        c = Number(c);
    }

    let result: number = 1;

    if (a !== undefined) {
        result *= a;
    }
    if (b !== undefined) {
        result *= b;
    }
    if (c !== undefined) {
        result *= c;
    }

    return result;
}

console.log(optionalMultiplier('3', 5, '10'));