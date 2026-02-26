function convertArrays(strings: string[]): [string, number] {
    let result: string = "";

    for (const element of strings) {
        result += element;
    }

    return [result, result.length];
}

console.log(convertArrays(['How', 'are', 'you?']));