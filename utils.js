function sumFinder(arr, num) {
  let obj = {};
  let diff;
  let idxs = [];
  const sorted = [...arr].sort((a, b) => b - a);
  for (let i = 0; i < sorted.length; i++) {
    diff = num - sorted[i];
    console.log(obj);
    if (obj[diff]) {
      idxs.push(i);
      return { even: true, indexes: idxs };
    } else {
      obj[sorted[i]] = true;
      idxs.push(i);
    }
  }
  return { even: false, indexes: [] };
}

module.exports = {
  sumFinder,
};
