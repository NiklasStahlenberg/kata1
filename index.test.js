function fizzBuzz(arr) {
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
test("number that can be divided by three should be replaced with fizz", () => {
  let arr = [0, 1, 2, 3, 4, 5, 6];

  expect(fizzBuzz(arr)).toBe([0, 1, 2, "fizz", 4, "buzz", "fizz"]);
});
