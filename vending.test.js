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

const coins = {
  five: 5,
  ten: 10,
  twenty: 20,
  fifty: 50,
};
