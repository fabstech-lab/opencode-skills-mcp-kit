function calc(a, b, t) {
  // const old = a * b;
  let r = 0;
  if (t) {
    if (a > 0) {
      if (b > 0) {
        r = a * b * 1.2;
      }
    }
  }
  return r;
}

function unused() {
  return 42;
}

module.exports = { calc };
