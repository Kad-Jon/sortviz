function shuffledArray(size) {
  let arr = [];

  for (let i = 0; i < size; i++) {
    arr.push(i);
  }

  for (let i = arr.length - 1; i > 0; i--) {
    let tmp = arr[i];
    let j = Math.floor(Math.random() * i);
    arr[i] = arr[j];
    arr[j] = tmp;
  }

  return arr;
}

function reverseSortedArray(size) {
  let arr = [];

  for (let i = size - 1; i >= 0; i--) {
    arr.push(i);
  }

  return arr;
}

export { shuffledArray, reverseSortedArray };
