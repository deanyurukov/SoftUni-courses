class Product {
    private static _productCount: number = 0;
    public readonly id: number;
    public _name!: string;
    public _price!: number;

    constructor(name: string, price: number) {
        Product.productCount++;
        this.id = Product.productCount;
        this.name = name;
        this.price = price;
    }

    public static get productCount(): number {
        return Product._productCount;
    }

    private static set productCount(newProductCount) {
        Product._productCount++;
    }

    get name(): string {
        return this._name;
    }

    set name(newName: string) {
        if (newName.length <= 0) {
            throw new Error("Name should be at least 1 character.");
        }

        this._name = newName;
    }

    get price(): number {
        return this._price;
    }

    set price(newPrice: number) {
        if (newPrice <= 0) {
            throw new Error("Price should be a positive number.");
        }

        this._price = newPrice;
    }

    getDetails(): string {
        return `ID: ${this.id}, Name: ${this.name}, Price: $${this.price}`;
    }
}

class Inventory {
    private products: Product[] = [];

    addProduct(product: Product): void {
        this.products.push(product);
    }

    listProducts(): string {
        let result: string[] = [];

        this.products.forEach(element => {
            result.push(element.getDetails());
        });

        result.push(`Total products created: ${Product.productCount}`)

        return result.join("\n");
    }
}

const inventory = new Inventory();
const product1 = new Product("Laptop", 1200);
const product2 = new Product("Phone", 800);

inventory.addProduct(product1);
inventory.addProduct(product2);
console.log(inventory.listProducts());