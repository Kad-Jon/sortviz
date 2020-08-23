export default async function quicksort(arr) {
  await quickSort(arr, 0, arr.getLength() - 1);
}

async function quickSort(arr, start, end) {
  if (start < end) {
    let partitionIndex = await partition(arr, start, end);

    await quickSort(arr, start, partitionIndex - 1);
    await quickSort(arr, partitionIndex + 1, end);
  }
}

async function partition(arr, start, end) {
  const pivot = await arr.get(end);

  // mark pivot element
  arr.mark(end, "yellow");

  // initialize L and R pointers
  let i = start;
  let j = start;

  arr.trackPointer(i, "purple");

  // scan for elements smaller than pivot with right pointer and place infront of left pointer, then increment left pointer
  while (j < end) {
    if ((await arr.compareElementToVal(j, pivot)) === -1) {
      await arr.swap(i++, j);
      arr.updatePointer(i - 1, i);
    }
    j++;
  }

  arr.untrackPointer(i);

  // unmark pivot and swap with final partition boundary
  arr.unmarkAll();
  await arr.swap(i, end);
  return i;
}
