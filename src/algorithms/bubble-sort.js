async function bubblesort(av) {
  let sorted = false;
  let lastSortedIndex = av.getLength();

  while (!sorted) {
    sorted = true;

    for (let i = 0; i < lastSortedIndex - 1; i++) {
      av.mark(i);

      if (av.get(i) < av.get(i + 1)) {
        av.swap(i, i + 1);
        sorted = false;
      }

      av.unmark(i);
    }
    av.markSorted(--lastSortedIndex);
  }

  av.sorted();
}
