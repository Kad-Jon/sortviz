import { sleep, swap, colorPair, colorSection } from "../util/sortutil";

export default async function bubbleSort(array, colorArray, index, callbacks) {
  const { setArray, setColorArray, delay, setIsSorting } = callbacks;

  let sorted = false;
  let lastSortedIndex = array.length;

  while (sorted === false) {
    sorted = true;

    for (let i = 0; i < lastSortedIndex - 1; i++) {
      colorArray[i] = "red";
      colorArray[i + 1] = "red";

      setColorArray(colorArray);
      await sleep(delay() / 1);

      if (array[i] > array[i + 1]) {
        swap(array, i, i + 1);
        setArray(array);
        sorted = false;
      }

      colorArray[i] = "white";
      colorArray[i + 1] = "white";
      setColorArray(colorArray);
    }

    colorArray[lastSortedIndex - 1] = "green";
    setColorArray(colorArray);
    lastSortedIndex--;
  }

  setIsSorting(true, index);
  return array;
}
