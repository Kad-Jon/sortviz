export function randomArray(size) {
  const arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * (size - 1)));
  }
  return arr;
}

export function linearArray(size) {
  const arr = [];
  for (let i = 1; i <= size; i++) {
    arr.push(i);
  }
  return arr;
}

export function polynomialArray(size, degree) {
  const arr = [];

  for (let i = 0; i < size; i++) {
    arr.push(Math.pow(i, degree));
  }
  return arr;
}

export function zeroCentredPolynomialArray(size, degree) {
  let arr = [];

  const lo = -Math.floor(size / 2);
  const hi = Math.ceil(size / 2);

  for (let i = lo; i < hi; i++) {
    arr.push(Math.pow(i, degree));
  }

  if (degree % 2 !== 0) {
    const translation = Math.pow(Math.ceil(size / 2), degree);
    arr = arr.map((element) => element + translation);
  }

  return arr;
}
