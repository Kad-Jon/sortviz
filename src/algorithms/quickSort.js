import { sleep, swap, colorPair, colorSection } from "../util/sortutil";

async function quickSort(array, colorArray, index, callbacks) {
  const { setArray, setColorArray, delay, setIsSorting } = callbacks;
  await quicksort(array, 0, array.length - 1);
  setIsSorting(false, index);

  async function quicksort(array, start, end) {
    if (start < end) {
      const pivotIndex = await partition(array, start, end);

      await quicksort(array, start, pivotIndex - 1);
      await quicksort(array, pivotIndex + 1, end);
    } else if (start === end) {
      colorArray[start] = "green";
      setColorArray(colorArray);
    }
  }

  async function partition(array, start, end) {
    const pivot = array[end];
    colorArray[end] = "yellow";
    let i = start - 1;
    let j = start;

    while (j < end) {
      colorArray[j] = "red";

      if (array[j] < pivot) {
        i++;
        colorArray[i] = "blue";
        swap(array, i, j);
      }

      setArray(array);
      setColorArray(colorArray);
      await sleep(delay());
      j++;
    }

    swap(array, i + 1, end);
    colorArray[end] = "red";
    colorArray[i + 1] = "green";
    removeColouringInPartition(colorArray, start, end);
    setArray(array);
    setColorArray(colorArray);
    return i + 1;
  }

  function removeColouringInPartition(colorArray, start, end) {
    for (let i = start; i <= end; i++) {
      if (colorArray[i] !== "green") {
        colorArray[i] = "white";
      }
    }
  }
}

export default quickSort;
