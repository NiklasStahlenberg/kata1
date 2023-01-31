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
const { sumFinder } = require("./utils");
console.log(sumFinder([5, 5, 10], 15));
const initChange = [
  ...Array(10).fill(5),
  ...Array(10).fill(10),
  ...Array(10).fill(20),
  ...Array(10).fill(50),
];

class VendingMachine {
  constructor() {
    this.validCoins = Object.freeze([5, 10, 20, 50]); //freeze object to make "immutable"
    this.products = Object.freeze(products); //freeze object to make "immutable"
    this.state = {
      coinsInMachine: [], //refactor name
      insertedCoins: [], //rename
    };
  }
  resetInsertedCoins() {
    this.state.insertedCoins = [];
  }
  getAllCoinsBack() {
    const ret = this.state.insertedCoins;
    this.state.insertedCoins = [];
    return ret;
  }
  insertCoin(coin) {
    if (!this.validCoins.includes(coin)) {
      throw new Error("Not a valid coin");
    }
    if (this.state.insertedCoins.length < 10) {
      this.state.insertedCoins = [...this.state.insertedCoins, coin]; //create new array instead of mutating;
    }
    return this.getInsertedAmount();
  }
  selectProduct(value) {
    const product = this.products[value];
    let valid = this.getInsertedAmount() > product.price;
    let change = 0;
    if (!valid) {
      throw new Error("insufficient amount");
    }

    // const evenAmount = sumFinder(this.state.tempCoins, product.price);

    // if (evenAmount.even) {
    //   //insert used coins to allCoins
    //   return {
    //     product,
    //     change: this.getSumOfArray(this.state.tempCoins) - product.price,
    //   };
    // }
    
    let currentAmount = 0;
    let coinsToPushToAllCoins = [];

    while (currentAmount < product.price) {
      const coin = sortedCoins[0];
      currentAmount += coin;
      coinsToPushToAllCoins.push(coin);
      sortedCoins.shift();
    }

    let insertedCoins = this.state.insertedCoins();
    let moneyleft = getinsertedamount - product.price;

    //const rest = currentAmount - product.price;
    sortedCoins.push(rest);
    this.state.coinsInMachine = [...this.state.coinsInMachine, ...insertedCoins]; //new array of allCoins
    //fetch change from allCoins
    var blabla = getChangeFromMachine(moneyleft);

    this.resetInsertedCoins();

    return {
      product,
      change: this.getSumOfArray(sortedCoins),
    };
  }

  getSumOfArray(arr) {
    return arr.reduce((acc, curr) => acc + curr, 0);
  }

  getState() {
    return this.state;
  }

  getInsertedAmount() {
    return this.getSumOfArray(this.state.insertedCoins);
  }

  getCoinsOfType(type) {
    return this.state.coinsInMachine.filter((t) => t === type);
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

  expect(machine.getState().insertedCoins.length).toEqual(10);
});

test("selectProduct should insert coin to machine and empty the tempCoin", () => {
  const machine = new VendingMachine();

  for (let i = 0; i < 11; i++) {
    machine.insertCoin(5);
  }

  machine.selectProduct(3);

  expect(machine.getState().insertedCoins.length).toEqual(0);
  expect(machine.getState().coinsInMachine.length).toEqual(5);
});

test.skip("should get change from allCoins when not even", () => {
  const machine = new VendingMachine();

  for (let i = 0; i < 3; i++) {
    machine.insertCoin(10);
  }

  let productAndChange = machine.selectProduct(2);

  expect(productAndChange.change).toEqual(15);
  expect(machine.getCoinsOfType(5).length).toEqual(1);
});
