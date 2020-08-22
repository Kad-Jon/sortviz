export default async function quicksort(arr) {
  await quickSort(arr, 0, arr.getLength() - 1);
}

async function quickSort(arr, start, end) {
  if (start < end) {
    let partitionIndex = await partition(arr, start, end);

    await quickSort(arr, start, partitionIndex - 1);
    await quickSort(arr, partitionIndex + 1, end);
  } else if (start === end) {
    arr.markSorted(start);
  }
}

async function partition(arr, start, end) {
  const pivot = await arr.get(end);

  // mark pivot
  arr.mark(end, "yellow");

  let i = start - 1;
  let j = start;

  while (j < end) {
    if ((await arr.compareElementToVal(j, pivot)) === -1) {
      i++;
      await arr.swap(i, j);

      // update partition boundary mark
      arr.unmark(i - 1);
      arr.mark(i, "purple");
    }

    j++;
  }

  arr.unmark(end);
  await arr.swap(i + 1, end);
  arr.markSorted(i + 1);
  return i + 1;
}
