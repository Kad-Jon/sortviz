import { sleep, colorPair, colorSection } from "../util/sortutil";

async function mergeSort(array, colorArray, index, callbacks) {
  const { setArray, setColorArray, delay, setIsSorting } = callbacks;
  await mergesort(array, 0, array.length - 1);
  setIsSorting(false, index);

  async function mergesort(subArray, start, end) {
    if (subArray.length < 2) {
      return subArray;
    }

    const middle = Math.floor(subArray.length / 2);

    const lCopy = subArray.slice(0, middle);
    const rCopy = subArray.slice(middle);

    const lSortedArr = await mergesort(lCopy, start, start + middle - 1);
    const rSortedArr = await mergesort(rCopy, start + middle, end);

    return await merge(lSortedArr, rSortedArr, start, start + middle, end);
  }

  async function merge(leftSubArray, rightSubArray, start, middle, end) {
    colorBoundaries(colorArray, start, middle, end);
    setArray(array);

    let shadowArray = [];
    let i = start;
    let j = middle;

    while (leftSubArray.length && rightSubArray.length) {
      const k = i;
      const l = j;

      colorPair(colorArray, "red", i, j);
      setColorArray(colorArray);
      await sleep(delay());

      if (leftSubArray[0] < rightSubArray[0]) {
        i++;
        shadowArray.push(leftSubArray.shift());
      } else {
        j++;
        shadowArray.push(rightSubArray.shift());
      }

      colorPair(colorArray, "white", k, l);
      colorBoundaries(colorArray, start, middle, end);
      setColorArray(colorArray);
    }

    const result = shadowArray.concat(
      leftSubArray.slice().concat(rightSubArray.slice())
    );

    colorSection(colorArray, "white", start, end);
    setColorArray(colorArray);

    await copyMergeResultToOriginal(result, start);
    return result;
  }

  async function copyMergeResultToOriginal(result, startIndex) {
    let j = 0;

    const isLastMerge = result.length === array.length;
    for (let i = startIndex; i < result.length + startIndex; i++) {
      array[i] = result[j];
      colorArray[i] = "red";
      if (i > 0) {
        colorArray[i - 1] = isLastMerge ? "green" : "white";
      }
      j++;
    }

    setArray(array);
    setColorArray(colorArray);
    await sleep(delay());

    colorArray[startIndex + result.length - 1] = isLastMerge
      ? "green"
      : "white";
  }
}

function colorBoundaries(colorArray, startIndex, middleIndex, endIndex) {
  colorArray[middleIndex] = "purple";
  colorArray[startIndex] = "yellow";
  colorArray[endIndex] = "yellow";
}

export default mergeSort;
