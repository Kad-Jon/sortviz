import bubblesort from "./bubblesort";
import selectionsort from "./selectionsort";
import insertionsort from "./insertionsort";
import mergesort from "./mergesort";
import quicksort from "./quicksort";
import dualpivotquicksort from "./dualpivotquicksort";

const sortingAlgorithms = {
  bubble: bubblesort,
  selection: selectionsort,
  insertion: insertionsort,
  merge: mergesort,
  quick: quicksort,
  dualpivotquick: dualpivotquicksort,
};

export default sortingAlgorithms;
