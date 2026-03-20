type AllFunctions<T> = {
    [property in keyof T as T[property] extends (...args: any[]) => any ? property : never]: T[property];
}

type test = { 
   name: string,
   age: number,
   test: () => string;
}
type extracted = AllFunctions<test>;