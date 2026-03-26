function checkUsers() {
    let usersAndTimes: Map<User, Date> = new Map();

    return {
        constructorUsers<T extends new (...args: any[]) => {}>(constructor: T) {
            return class extends constructor {
                constructor(...args: any[]) {
                    super(...args);
                    const initial: User[] = args[0];

                    initial.forEach(user => {
                        const date: Date = new Date();
                        usersAndTimes.set(user, date);
                    });
                }
            }
        },
        addUser(target: Object, key: string, descriptor: PropertyDescriptor) {
            const original = descriptor.value;

            descriptor.value = function (user: User) {
                const date: Date = new Date();
                usersAndTimes.set(user, date);
                return original.call(this, user);
            }

            return descriptor;
        },
        getUsers(target: Object, key: string, descriptor: PropertyDescriptor) {
            descriptor.value = function () {
                const currentTime = new Date();
                const users: User[] = [];

                usersAndTimes.forEach((date: Date, user: User) => {
                    const difference = currentTime.getSeconds() - date.getSeconds();

                    if (difference <= 5) {
                        users.push(user);
                    }
                });

                const censored: User[] = userCensorService.censorProperties(users);
                return censored;
            }

            return descriptor;
        }
    }
}

function checkEmployees() {
    let employeesAndTimes: Map<Employee, Date> = new Map();

    return {
        constructorEmployees<T extends new (...args: any[]) => {}>(constructor: T) {
            return class extends constructor {
                constructor(...args: any[]) {
                    super(...args);
                    const initial: Employee[] = args[1];

                    initial.forEach(employee => {
                        const date: Date = new Date();
                        employeesAndTimes.set(employee, date);
                    });
                }
            }
        },
        addEmployee(target: Object, key: string, descriptor: PropertyDescriptor) {
            const original = descriptor.value;

            descriptor.value = function (employee: Employee) {
                const date: Date = new Date();
                employeesAndTimes.set(employee, date);
                return original.call(this, employee);
            }

            return descriptor;
        },
        getEmployees(target: Object, key: string, descriptor: PropertyDescriptor) {
            descriptor.value = function () {
                const currentTime = new Date();
                const employees: Employee[] = [];

                employeesAndTimes.forEach((date: Date, employee: Employee) => {
                    const difference = currentTime.getSeconds() - date.getSeconds();

                    if (difference <= 10) {
                        employees.push(employee);
                    }
                });

                console.log(`Method ${key} called successfully`);
                const censored: Employee[] = employeeCensorService.censorProperties(employees);
                return censored;
            }

            return descriptor;
        }
    }
}

class MockCensorService<T extends { [key: string]: any }> {
    constructor(private censoredProperties: string[]) { }

    censorProperties(items: T[]) {
        let censoredItems = items.slice();
        censoredItems.forEach(i => {
            this.censoredProperties.forEach(prop => { delete i[prop]; });
        });

        return censoredItems;
    }
}

let userCensorService = new MockCensorService<User>(['creditCardNumber']);
let employeeCensorService = new MockCensorService<Employee>(['birthday', 'salary']);
const userTracker = checkUsers();
const employeeTracker = checkEmployees();

class User {
    constructor(public name: string, public age: number, public creditCardNumber: string) { }

    getInfo() {
        return `${this.name}, Age: ${this.age} CreditCardNumber: ${this.creditCardNumber}`;
    }
}

class Employee {
    constructor(public name: string, public birthday: Date, public salary: number) { }

    getInfo() {
        return `${this.name}, Birthday: ${this.birthday?.toLocaleDateString()} Salary: ${this.salary}`;
    }
}

@userTracker.constructorUsers
@employeeTracker.constructorEmployees
class UsersService {
    private _users: User[];
    private _employees: Employee[];

    constructor(users: User[], employees: Employee[]) {
        this._users = users;
        this._employees = employees;
    }

    @userTracker.addUser
    addUser(user: User) {
        this._users.push(user);
    }

    @employeeTracker.addEmployee
    addEmployee(employee: Employee) {
        this._employees.push(employee);
    }

    @userTracker.getUsers
    getUsers() {
        return this._users;
    }

    @employeeTracker.getEmployees
    getEmployees() {
        return this._employees;
    }
}

const user1 = new User('John Does', 30, 'ABCD-1234');
const user2 = new User('Benny Tres', 23, 'EFGH-5678');
const emp1 = new Employee('Sarah Connor', new Date(1964, 4, 15), 2500);
const emp2 = new Employee('Arnold Schwarzenegger', new Date(1947, 6, 30), 3500);
let usersService = new UsersService([user1, user2], [emp1, emp2]);
let users = usersService.getUsers();
console.log(users.map(x => x.getInfo()));
let employees = usersService.getEmployees();
console.log(employees.map(x => x.getInfo()));
setTimeout(() => {
    const user3 = new User('Jimmy Quatro', 27, 'IJKL-9012');
    const emp3 = new Employee('Kyle Reese', new Date(2004, 0, 1), 2000);
    usersService.addUser(user3);
    usersService.addEmployee(emp3);
    let users = usersService.getUsers();
    console.log(users.map(x => x.getInfo()));
    let employees = usersService.getEmployees();
    console.log(employees.map(x => x.getInfo()));
}, 7000)
setTimeout(() => {
    let users = usersService.getUsers();
    console.log(users.map(x => x.getInfo()));
    let employees = usersService.getEmployees();
    console.log(employees.map(x => x.getInfo()));
}, 15000)