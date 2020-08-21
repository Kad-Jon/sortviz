import { swap, sleep, colorSection, colorPair } from "../util/sortutil";

export default async function insertionSort(
  array,
  colorArray,
  index,
  callbacks
) {
  const { setArray, setColorArray, delay, setIsSorting } = callbacks;

  for (let i = 1; i < array.length; i++) {
    let j = i;
    colorArray[j] = "red";
    while (array[j] < array[j - 1] && j > 0) {
      swap(array, j, j - 1);
      colorArray[j] = "white";
      colorArray[j - 1] = "red";
      setArray(array);
      setColorArray(colorArray);
      await sleep(delay());
      j--;
    }

    colorArray[j] = "blue";
    setColorArray(colorArray);
    await sleep(delay());
    colorArray[j] = "white";
    setColorArray(colorArray);
  }

  colorSection(colorArray, "green", 0, array.length - 1);
  setColorArray(colorArray);
  setIsSorting(false, index);
}
