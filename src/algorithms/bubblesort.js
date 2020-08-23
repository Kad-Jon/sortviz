export default async function bubblesort(arr) {
  let sorted = false;
  let lastSortedIndex = arr.getLength();

  while (!sorted) {
    sorted = true;

    for (let i = 0; i < lastSortedIndex - 1; i++) {
      if ((await arr.compare(i, i + 1)) === 1) {
        await arr.swap(i, i + 1);
        sorted = false;
      }
    }
    arr.markSorted(--lastSortedIndex);
  }
}
