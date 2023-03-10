function fizzBuzz(length) {
  const arr = Array.from(Array(length).keys());
  const sorted = arr.sort((a, b) => a - b);
  const replaced = sorted.map((num) => {
    if (num === 0) return num;
    if (num % 3 === 0 && num % 5 === 0) {
      return "FizzBuzz";
    } else if (num % 3 === 0) {
      return "fizz";
    } else if (num % 5 === 0) {
      return "buzz";
    }
    return num;
  });
  console.log(replaced);
  return replaced;
}
test.skip("number that can be divided by three should be replaced with fizz", () => {
  expect(fizzBuzz(7)).toEqual([0, 1, 2, "fizz", 4, "buzz", "fizz"]);
});
