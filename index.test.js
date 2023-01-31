function sum(a, b) {
  return a + b;
}

function fizzBuzz(arr) {
  const sorted = arr.sort((a, b) => b - a);
  const replaced = sorted.map((num) => {
    if (num % 3 === 0 && num % 5) {
      return "FizzBuzz";
    }
  });
}

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});
