interface CountableSet<T> {
    add(item: T): void;
    remove(item: T): void;
    contains(item: T): boolean;
    getNumberOfCopies(item: T): number;
}

class CountedSet<T> implements CountableSet<T> {
    // •	contains(item: T) – if item exists in the set and has a count > 0 – returns true, otherwise returns false.
    // •	getNumberOfCopies(item: T) – returns the number of copies of the item in the set, if the item doesn’t exist in the set returns 0.
    private items: [T, number][] = [];

    public add(item: T): void {
        const value: [T, number] | undefined = this.items.find(val => val[0] === item);

        if (value === undefined) {
            this.items.push([item, 1]);
        }
        else {
            const index = this.items.indexOf(value);
            this.items[index][1]++;
        }
    }

    public remove(item: T): void {
        const value: [T, number] | undefined = this.items.find(val => val[0] === item);

        if (value !== undefined && value[1] > 0) {
            const index = this.items.indexOf(value);
            this.items[index][1]--;
        }
    }

    public contains(item: T): boolean {
        const val = this.items.find(val => val[0] === item);
        return (val === undefined || val[1] === 0) ? false : true;
    }

    public getNumberOfCopies(item: T): number {
        const val = this.items.find(val => val[0] === item);
        return val === undefined ? 0 : val[1];
    }
}

let countedSet = new CountedSet<string>();
countedSet.add('test');
countedSet.add('test');
console.log(countedSet.contains('test'));
console.log(countedSet.getNumberOfCopies('test'));
countedSet.remove('test');
countedSet.remove('test');
countedSet.remove('test');
console.log(countedSet.getNumberOfCopies('test'));
console.log(countedSet.contains('test'));