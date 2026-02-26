function formatPerson([name, age]: [string, number]): string {
    return `Hello, my name is ${name} and my age is ${age}`;
}

console.log(formatPerson(['Ivan', 20]));