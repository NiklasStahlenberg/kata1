/*

You must implement a class VendingMachine with three public methods:
InsertCoin() - takes Coin object and returns total amount of inserted value
GetAllCoinsBack() - removes all inserted coins from the machine and returns them
SelectProduct() - returns selected product and change, accepts integer as input to indicate slot in the machine

Restricions:
Possible nominal values for coins - 5, 10, 20, 50
Slot contains 20 product slots (1 .. 20)
You can store up to 50 coins of each type in the machine
Temporary coin storage can take up to 10 coins

*/
const products = require("./product");

class VendingMachine {
  constructor() {
    this.validCoins = [5, 10, 20, 50];
    this.products = products;
    this.state = {
      allCoins: [],
      tempCoins: [],
      totalSum: 0,
    };
  }
  resetAllCoins() {
    this.state.allCoins = [];
  }
  resetTempCoins() {
    this.state.tempCoins = [];
  }
  getAllCoinsBack() {
    const ret = this.state.tempCoins;
    this.state.tempCoins = [];
    return ret;
  }
  insertCoin(coin) {
    if (!this.validCoins.includes(coin)) {
      throw new Error("Not a valid coin");
    }
    if (this.state.tempCoins.length < 10) {
      this.state.tempCoins.push(coin);
    }
    return this.getInsertedAmount();
  }
  selectProduct(value) {
    const product = this.products[value];
    let valid = this.getInsertedAmount() > product.price;

    if (!valid) {
      throw new Error("insufficient amount");
    }

    let change = this.getInsertedAmount() - product.price;

    return {
      product,
      change,
    };
  }

  getState() {
    return this.state;
  }

  getInsertedAmount() {
    const tot = this.state.tempCoins.reduce((acc, curr) => acc + curr, 0);
    return tot;
  }
}

test.skip("Should throw if coin is not of value 5, 10, 20, 50", () => {
  const machine = new VendingMachine();
  expect(machine.insertCoin(7)).toThrow();
});

test("Should return total amount of inserted coins", () => {
  const machine = new VendingMachine();
  let total = machine.insertCoin(5);
  total = machine.insertCoin(10);
  total = machine.insertCoin(20);
  total = machine.insertCoin(50);

  expect(total).toEqual(85);
});

test("GetAllCoinsBack shoud return an array of all unused inserted coins", () => {
  const machine = new VendingMachine();
  machine.insertCoin(5);
  machine.insertCoin(10);
  expect(machine.getAllCoinsBack()).toEqual([5, 10]);
  expect(machine.getInsertedAmount()).toEqual(0);
});

test("selectProduct should return selected product and change", () => {
  const machine = new VendingMachine();
  machine.insertCoin(5);
  machine.insertCoin(20);
  machine.insertCoin(10);
  const productAndChange = machine.selectProduct(2);
  expect(productAndChange.product.name).toEqual(products[2].name);
  expect(productAndChange.change).toEqual(20);
});

test("temporary coins can not exceed 10", () => {
  const machine = new VendingMachine();

  for (let i = 0; i < 11; i++) {
    machine.insertCoin(5);
  }

  expect(machine.getState().tempCoins.length).toEqual(10);
});
test("selectProduct should insert coin to machine and empty the tempCoin", () => {
  const machine = new VendingMachine();

  for (let i = 0; i < 11; i++) {
    machine.insertCoin(5);
  }

  machine.selectProduct(3);

  expect(machine.getState().tempCoins.length).toEqual(0);
  expect(machine.getState().allCoins.length).toEqual(5);
});
