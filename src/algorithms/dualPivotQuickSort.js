import { swap, sleep, colorPair } from "../util/sortutil";

async function dualPivotQuickSort(array, colorArray, index, callbacks) {
  const { setArray, setColorArray, delay, setIsSorting } = callbacks;
  await dualpivotquicksort(array, 0, array.length - 1);
  setIsSorting(false, index);

  async function dualpivotquicksort(array, start, end) {
    if (start < end) {
      const pivots = await partition(array, start, end);

      await dualpivotquicksort(array, start, pivots[0] - 1);
      await dualpivotquicksort(array, pivots[0] + 1, pivots[1] - 1);
      await dualpivotquicksort(array, pivots[1] + 1, end);
    } else if (start === end) {
      colorArray[start] = "green";
      setColorArray(colorArray);
      await sleep(delay());
    }
  }

  async function partition(array, start, end) {
    colorPair(colorArray, "yellow", start, end);

    if (array[start] > array[end]) {
      swap(array, start, end);
      setArray(array);
    }
    let lpivot = array[start];
    let rpivot = array[end];

    let i = start + 1;
    let j = end - 1;

    let curr = start + 1;

    while (curr <= j) {
      await sleep(delay());
      if (array[curr] < lpivot) {
        swap(array, curr, i);
        i++;
      } else if (array[curr] >= rpivot) {
        while (array[j] > rpivot && curr < j) {
          colorArray[j] = "red";
          setColorArray(colorArray);
          j--;
          await sleep(delay());
        }

        swap(array, curr, j);
        colorArray[j] = "red";
        colorArray[curr] = "purple";
        setArray(array);
        setColorArray(colorArray);
        await sleep(delay());
        j--;

        if (array[curr] < lpivot) {
          swap(array, curr, i);
          colorArray[i] = "blue";
          setArray(array);
          setColorArray(colorArray);
          await sleep(delay());
          i++;
        }
      }
      curr++;
    }
    i--;
    j++;

    swap(array, start, i);
    swap(array, end, j);
    colorPair(colorArray, "green", i, j);
    setArray(array);
    setColorArray(colorArray);
    removeColouringInPartition(colorArray, start, end);
    await sleep(delay());
    return [i, j];
  }

  function removeColouringInPartition(colorArray, start, end) {
    for (let i = start; i <= end; i++) {
      if (colorArray[i] !== "green") {
        colorArray[i] = "white";
      }
    }
  }
}

export default dualPivotQuickSort;
