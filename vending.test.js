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
  returnCoins() {
    const ret = this.state.tempCoins;
    this.state.tempCoins = [];
    return ret;
  }
  insertCoin(coin) {
    if (!this.validCoins.includes(coin)) {
      throw new Error("Not a valid coin");
    }
    this.state.tempCoins.push(coin);
    return this.getInsertedAmount();
  }
  selectProduct(value) {
    let valid = true;
    if (valid) {
      this.state = [...this.allCoins, ...this.tempCoins];
    }
  }

  getState() {
    return this.state;
  }

  getInsertedAmount() {
    const tot = this.state.tempCoins.reduce((acc, curr) => acc + curr, 0);
    return this.state.tempCoins;
  }
}

test("Should throw if coin is not of value 5, 10, 20, 50", () => {
  const machine = new VendingMachine();
  expect(machine.insertCoin(7)).toThrow();
});
