export function ApplyInsurance(target: object, propertyKey: string, descriptor: PropertyDescriptor) {
    const getter = descriptor.get;

    if (!getter) {
        throw new Error("ApplyInsurance can only be applied to getters");
    }

    descriptor.get = function(): number | undefined {
        const result: number | undefined = getter.call(this);

        if (!result) {
            return undefined;
        }

        return Number((result * 1.12).toFixed(2));
    }
}