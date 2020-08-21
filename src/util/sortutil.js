export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function swap(arr, i, j) {
  let tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}

export function colorPair(colArr, col, i, j) {
  colArr[i] = col;
  colArr[j] = col;
}

export function colorSection(colArr, col, firstIndex, lastIndex) {
  for (let i = firstIndex; i <= lastIndex; i++) {
    colArr[i] = col;
  }
}
