function evenSum(a: number, b: number, c: number): boolean {
    const sum: number = a + b + c;
    return sum % 2 === 0;
}

console.log(evenSum(1, 2, 3));