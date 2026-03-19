type Choose<T, K extends keyof T> = {
    [property in K]: T[property];
}

type test = { 
   name: string,
   age: number,
   test:() => string;
}
type extracted = Choose<test, 'name' | 'age'>;