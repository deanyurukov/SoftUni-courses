function Operator(param: string | number | string[], operation: "Index" | "Length" | "Add", operand: number): string | number {
    if (operation === "Index" && (typeof param === "string" || Array.isArray(param))) {
        return param[operand];
    }
    else if (operation === "Length" && (typeof param === "string" || Array.isArray(param))) {
        return param.length % operand;
    }
    else if (operation === "Add" && (typeof param === "string" || typeof param === "number")) {
        return Number(param) + operand;
    }

    return -1;
}

console.log(Operator(['First', 'Second', 'Third'], 'Index', 1));