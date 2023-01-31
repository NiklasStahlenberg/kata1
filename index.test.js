function sum(a, b) {
  return a + b;
}

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("number that can be divided by three should be replaced with fizz", () => {
  let arr = [0, 1 ,2 , 3, 4, 5, 6];

   expect(fizzBuzz(arr).toBe([0, 1, 2, "fizz", 4, 5, "fizz"]));
})
