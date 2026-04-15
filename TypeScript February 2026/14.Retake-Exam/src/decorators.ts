export function CriticalStrike(target: object, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const original = descriptor.value;

    if (typeof original !== "function") {
        throw new Error("CriticalStrike can only be applied to methods");
    }

    descriptor.value = function(): number {
        const dmg: number = original.call(this);
        return dmg * 1.5;
    }

    return descriptor;
}