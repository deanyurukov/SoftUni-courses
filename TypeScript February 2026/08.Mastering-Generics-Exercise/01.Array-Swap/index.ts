function swap<T>(a: T[], aIndex: number, b: T[], bIndex: number): void {
    const temp: T[] = [...a];
    a[aIndex] = b[bIndex];
    b[bIndex] = temp[aIndex];
}

let a = ['test', '123'];
let b = ['a', 'b', 'c'];
swap<string>(a, 0, b, 2);
console.log(a);
console.log(b);