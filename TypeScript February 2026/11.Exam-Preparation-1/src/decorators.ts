export function ConvertToEuro(target: object, key: string, descriptor: PropertyDescriptor) {
    const getter = descriptor.get;

    if (!getter) {
        throw new Error("ConvertToEuro can only be applied to getters");
    }

    descriptor.get = function() {
        const originalRes: number | undefined = getter.call(this);
        
        if (originalRes === undefined) {
            return undefined;
        }
        
        return (originalRes / 1.95583).toFixed(2);
    };
}