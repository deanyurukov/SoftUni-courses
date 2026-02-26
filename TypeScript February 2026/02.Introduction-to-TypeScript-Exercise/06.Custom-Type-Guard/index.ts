function customTypeGuard(arr: unknown): arr is string[] {
    if (!Array.isArray(arr) || arr.length === 0) {
        return false;
    }

    for (const element of arr) {
        if (typeof element !== "string") {
            return false;
        }
    }

    return true;
}

console.log(customTypeGuard(['a', 'b', 'c']));