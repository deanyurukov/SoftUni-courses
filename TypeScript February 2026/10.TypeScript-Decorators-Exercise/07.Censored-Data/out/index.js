"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
function checkUsers() {
    let usersAndTimes = new Map();
    return {
        constructorUsers(constructor) {
            return class extends constructor {
                constructor(...args) {
                    super(...args);
                    const initial = args[0];
                    initial.forEach(user => {
                        const date = new Date();
                        usersAndTimes.set(user, date);
                    });
                }
            };
        },
        addUser(target, key, descriptor) {
            const original = descriptor.value;
            descriptor.value = function (user) {
                const date = new Date();
                usersAndTimes.set(user, date);
                return original.call(this, user);
            };
            return descriptor;
        },
        getUsers(target, key, descriptor) {
            descriptor.value = function () {
                const currentTime = new Date();
                const users = [];
                usersAndTimes.forEach((date, user) => {
                    const difference = currentTime.getSeconds() - date.getSeconds();
                    if (difference <= 5) {
                        users.push(user);
                    }
                });
                const censored = userCensorService.censorProperties(users);
                return censored;
            };
            return descriptor;
        }
    };
}
function checkEmployees() {
    let employeesAndTimes = new Map();
    return {
        constructorEmployees(constructor) {
            return class extends constructor {
                constructor(...args) {
                    super(...args);
                    const initial = args[1];
                    initial.forEach(employee => {
                        const date = new Date();
                        employeesAndTimes.set(employee, date);
                    });
                }
            };
        },
        addEmployee(target, key, descriptor) {
            const original = descriptor.value;
            descriptor.value = function (employee) {
                const date = new Date();
                employeesAndTimes.set(employee, date);
                return original.call(this, employee);
            };
            return descriptor;
        },
        getEmployees(target, key, descriptor) {
            descriptor.value = function () {
                const currentTime = new Date();
                const employees = [];
                employeesAndTimes.forEach((date, employee) => {
                    const difference = currentTime.getSeconds() - date.getSeconds();
                    if (difference <= 10) {
                        employees.push(employee);
                    }
                });
                console.log(`Method ${key} called successfully`);
                const censored = employeeCensorService.censorProperties(employees);
                return censored;
            };
            return descriptor;
        }
    };
}
class MockCensorService {
    censoredProperties;
    constructor(censoredProperties) {
        this.censoredProperties = censoredProperties;
    }
    censorProperties(items) {
        let censoredItems = items.slice();
        censoredItems.forEach(i => {
            this.censoredProperties.forEach(prop => { delete i[prop]; });
        });
        return censoredItems;
    }
}
// let userCensorService = new MockCensorService<User>(['creditCardNumber']);
// let employeeCensorService = new MockCensorService<Employee>(['birthday', 'salary']);
let userCensorService = new MockCensorService(['age']);
let employeeCensorService = new MockCensorService(['salary']);
const userTracker = checkUsers();
const employeeTracker = checkEmployees();
class User {
    name;
    age;
    creditCardNumber;
    constructor(name, age, creditCardNumber) {
        this.name = name;
        this.age = age;
        this.creditCardNumber = creditCardNumber;
    }
    getInfo() {
        return `${this.name}, Age: ${this.age} CreditCardNumber: ${this.creditCardNumber}`;
    }
}
class Employee {
    name;
    birthday;
    salary;
    constructor(name, birthday, salary) {
        this.name = name;
        this.birthday = birthday;
        this.salary = salary;
    }
    getInfo() {
        return `${this.name}, Birthday: ${this.birthday?.toLocaleDateString()} Salary: ${this.salary}`;
    }
}
let UsersService = class UsersService {
    _users;
    _employees;
    constructor(users, employees) {
        this._users = users;
        this._employees = employees;
    }
    addUser(user) {
        this._users.push(user);
    }
    addEmployee(employee) {
        this._employees.push(employee);
    }
    getUsers() {
        return this._users;
    }
    getEmployees() {
        return this._employees;
    }
};
__decorate([
    userTracker.addUser,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User]),
    __metadata("design:returntype", void 0)
], UsersService.prototype, "addUser", null);
__decorate([
    employeeTracker.addEmployee,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Employee]),
    __metadata("design:returntype", void 0)
], UsersService.prototype, "addEmployee", null);
__decorate([
    userTracker.getUsers,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersService.prototype, "getUsers", null);
__decorate([
    employeeTracker.getEmployees,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersService.prototype, "getEmployees", null);
UsersService = __decorate([
    userTracker.constructorUsers,
    employeeTracker.constructorEmployees,
    __metadata("design:paramtypes", [Array, Array])
], UsersService);
// const user1 = new User('John Does', 30, 'ABCD-1234');
// const user2 = new User('Benny Tres', 23, 'EFGH-5678');
// const emp1 = new Employee('Sarah Connor', new Date(1964, 4, 15), 2500);
// const emp2 = new Employee('Arnold Schwarzenegger', new Date(1947, 6, 30), 3500);
// let usersService = new UsersService([user1, user2], [emp1, emp2]);
// let users = usersService.getUsers();
// console.log(users.map(x => x.getInfo()));
// let employees = usersService.getEmployees();
// console.log(employees.map(x => x.getInfo()));
// //7 seconds later
// setTimeout(() => {
//     const user3 = new User('Jimmy Quatro', 27, 'IJKL-9012');
//     const emp3 = new Employee('Kyle Reese', new Date(2004, 0, 1), 2000);
//     usersService.addUser(user3);
//     usersService.addEmployee(emp3);
//     let users = usersService.getUsers();
//     console.log(users.map(x => x.getInfo()));
//     let employees = usersService.getEmployees();
//     console.log(employees.map(x => x.getInfo()));
// }, 7000)
// //15 seconds later
// setTimeout(() => {
//     let users = usersService.getUsers();
//     console.log(users.map(x => x.getInfo()));
//     let employees = usersService.getEmployees();
//     console.log(employees.map(x => x.getInfo()));
// }, 15000)
const user1 = new User('John Does', 30, 'ABCD-1234');
const user2 = new User('Benny Tres', 23, 'EFGH-5678');
const emp1 = new Employee('Sarah Connor', new Date(1964, 4, 15), 2500);
const emp2 = new Employee('Arnold Schwarzenegger', new Date(1947, 6, 30), 3500);
let usersService = new UsersService([user1, user2], [emp1, emp2]);
let users = usersService.getUsers();
console.log(users.map(x => x.getInfo()));
let employees = usersService.getEmployees();
console.log(employees.map(x => x.getInfo()));
//7 seconds later
setTimeout(() => {
    const user3 = new User('Jimmy Quatro', 27, 'IJKL-9012');
    const emp3 = new Employee('Kyle Reese', new Date(2004, 0, 1), 2000);
    usersService.addUser(user3);
    usersService.addEmployee(emp3);
    let users = usersService.getUsers();
    console.log(users.map(x => x.getInfo()));
    let employees = usersService.getEmployees();
    console.log(employees.map(x => x.getInfo()));
}, 7000);
//15 seconds later
setTimeout(() => {
    let users = usersService.getUsers();
    console.log(users.map(x => x.getInfo()));
    let employees = usersService.getEmployees();
    console.log(employees.map(x => x.getInfo()));
}, 15000);
//# sourceMappingURL=index.js.map