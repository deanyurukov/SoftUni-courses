function authorizeGetters(instance: MockAuthorizationService): Function {
    return function(target: string, key: string, descriptor: PropertyDescriptor) {
        const getter = descriptor.get;

        descriptor.get = function() {
            const result = getter?.call(this);
            const hasAccess = instance.canViewData(key);
            
            if (hasAccess) {
                return result;
            }
            else {
                throw new Error("You are not authorized to view this information");
            }
        }

        return descriptor;
    }
}

class MockAuthorizationService {
    constructor(private userRole: 'Guest' | 'PersonalDataAdministrator' | 'Admin') { }

    canViewData(property: string) {
        switch (this.userRole) {
            case 'Admin': return true;
            case 'PersonalDataAdministrator': return ['name', 'age'].includes(property);
            default: return false;
        }
    }
}

let mockAuthorizationService = new MockAuthorizationService('Admin');

class User {
    private _name: string;
    private _age: number;
    private _creditCardNumber: string;

    constructor(name: string, age: number, creditCardNumber: string) {
        this._name = name;
        this._age = age;
        this._creditCardNumber = creditCardNumber;
    }

    @authorizeGetters(mockAuthorizationService)
    get name(): string {
        return this._name;
    }

    @authorizeGetters(mockAuthorizationService)
    get age(): number {
        return this._age;
    }

    @authorizeGetters(mockAuthorizationService)
    get creditCardNumber(): string {
        return this._creditCardNumber;
    }
}

const user1 = new User("John Doe", 30, 'ABCD-1234');
console.log(user1.name);
console.log(user1.age);
console.log(user1.creditCardNumber);