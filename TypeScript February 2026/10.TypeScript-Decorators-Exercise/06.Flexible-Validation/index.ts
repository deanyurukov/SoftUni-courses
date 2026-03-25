function validateName(minChars: number) {
    return function (target: Object, key: string, descriptor: PropertyDescriptor) {
        const setter = descriptor.set;

        descriptor.set = function(val: string) {
            if (val.length <= minChars) {
                throw new Error(`Name must have a min length of ${minChars} characters`);
            }

            return setter?.call(this, val);
        }
    }
}

function validateAge(min: number, max: number) {
    return function (target: Object, key: string, descriptor: PropertyDescriptor) {
        const setter = descriptor.set;

        descriptor.set = function(val: number) {
            if (val < min || val > max) {
                throw new Error(`Age must be between ${min} and ${max}`);
            }

            return setter?.call(this, val);
        }
    }
}

function validatePassword(regex: RegExp) {
    return function (target: Object, key: string, descriptor: PropertyDescriptor) {
        const setter = descriptor.set;

        descriptor.set = function(val: string) {
            if (!regex.test(val)) {
                throw new Error(`Password needs to match ${regex}`);
            }

            return setter?.call(this, val);
        }
    }
}

const minLength = 1;
const min = 1, max = 150;
const regex = /^[a-zA-Z0-9!@]+$/;

class User {
    private _name!: string;
    private _age!: number;
    private _password!: string;

    constructor(name: string, age: number, password: string) {
        this.name = name;
        this.age = age;
        this.password = password;
    }

    @validateName(minLength)
    set name(val: string) {
        this._name = val;
    }

    @validateAge(min, max)
    set age(val: number) {
        this._age = val;
    }

    @validatePassword(regex)
    set password(val: string) {
        this._password = val;
    }

    get name() {
        return this._name;
    }

    get age() {
        return this._age;
    }
}

let user = new User('John', 130, 'hardPassword12');
let user2 = new User('John', 30, '!test');
let user3 = new User('John', 25, '@werty');
let user4 = new User('Jo', 20, 'password123');