function conditionalNumber<T>(val: T extends number ? number : string): void {
    if (typeof val === "number") {
        console.log(val.toFixed(2));
    }
    else {
        console.log(val);
    }
}

conditionalNumber<number>(20.3555);
conditionalNumber<string>('wow');
conditionalNumber<boolean>('a string');
conditionalNumber<boolean>(30);
conditionalNumber<number>('test');