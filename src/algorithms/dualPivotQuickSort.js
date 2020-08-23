export default async function dualpivotquicksort(arr) {
  await dualPivotQuickSort(arr, 0, arr.getLength() - 1);
}

async function dualPivotQuickSort(arr, start, end) {
  if (start < end) {
    const partitions = await partition(arr, start, end);

    await dualPivotQuickSort(arr, start, partitions[0] - 1);
    await dualPivotQuickSort(arr, partitions[0] + 1, partitions[1] - 1);
    await dualPivotQuickSort(arr, partitions[1] + 1, end);
  }
}

async function partition(arr, start, end) {
  if ((await arr.compare(start, end)) === 1) {
    await arr.swap(start, end);
  }

  arr.markPair(start, end, "yellow");

  const lpivot = await arr.get(start);
  const rpivot = await arr.get(end);

  let i = start + 1;
  let j = end - 1;
  let curr = start + 1;

  arr.trackPointer(i, "purple");
  arr.trackPointer(j, "purple");

  while (curr <= j) {
    let currVal = await arr.get(curr);
    if (currVal < lpivot) {
      await arr.swap(curr, i++);
      arr.updatePointer(i - 1, i);
    } else if (currVal >= rpivot) {
      while ((await arr.compareElementToVal(j, rpivot)) === 1 && curr < j) {
        j--;
        arr.updatePointer(j + 1, j);
      }

      await arr.swap(curr, j--);
      arr.updatePointer(j + 1, j);

      if ((await arr.compareElementToVal(curr, lpivot)) === -1) {
        await arr.swap(curr, i++);
        arr.updatePointer(i - 1, i);
      }
    }
    curr++;
  }
  i--;
  j++;
  arr.unmarkAll();
  await arr.swap(start, i);
  await arr.swap(end, j);
  return [i, j];
}
