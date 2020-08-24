import { sleep } from "../util/sortutil";

class ArrayViewController {
  constructor(array, colorArray, index, callbacks) {
    this.array = array;
    this.colorArray = colorArray;
    this.length = array.length;
    this.index = index;
    this.getDelay = callbacks.getDelay;
    this.setArray = callbacks.setArray;
    this.setColorArray = callbacks.setColorArray;
    this.setIsSorting = callbacks.setIsSorting;
    this.setArrayAccesses = callbacks.setArrayAccesses;

    this.pointers = [];
    this.arrayAccesses = 0;
  }

  // delay to be applied to async array manipulations
  async delay(multiplier = 1) {
    await sleep(this.getDelay() * multiplier);
  }

  // Animated array manipulations. Each array read and write are delayed by one unit and
  // highlighted with tracked elements are refreshed before and after any manipulation

  async get(i, color = "red") {
    const { array, colorArray, setArrayAccesses, index } = this;
    let { arrayAccesses } = this;

    this.colorTrackedPointers();

    const prevColor = colorArray[i];
    this.mark(i, color);
    await this.delay();
    this.mark(i, prevColor);

    setArrayAccesses(++arrayAccesses, index);
    this.arrayAccesses = arrayAccesses;

    return array[i];
  }

  async compare(i, j, color = "red") {
    this.markPair(i, j, color);
    const leftVal = await this.get(i, color);
    const rightVal = await this.get(j, color);
    this.unmarkPair(i, j);
    return this.compareVals(leftVal, rightVal);
  }

  async compareToVal(i, val, color = "red") {
    const elementVal = await this.get(i, color);
    return this.compareVals(elementVal, val);
  }

  compareVals(valOne, valTwo) {
    const lessThan = -1;
    const equal = 0;
    const moreThan = 1;

    if (valOne > valTwo) return moreThan;
    if (valOne < valTwo) return lessThan;
    return equal;
  }

  async set(i, val, color = "red") {
    const { array, setArray, colorArray, index, setArrayAccesses } = this;
    let { arrayAccesses } = this;

    this.colorTrackedPointers();

    const prevColor = colorArray[i];
    this.mark(i, color);
    array[i] = val;
    setArray(array, index);
    await this.delay();
    this.mark(i, prevColor);

    setArrayAccesses(++arrayAccesses, index);
    this.arrayAccesses = arrayAccesses;
  }

  async swap(i, j, color = "blue") {
    if (i === j) return;
    const { colorArray } = this;

    this.colorTrackedPointers();

    const iprev = colorArray[i];
    const jprev = colorArray[j];
    this.markPair(i, j, color);

    const tmp = await this.get(i, color);
    const jVal = await this.get(j, color);
    await this.set(i, jVal, color);
    await this.set(j, tmp, color);

    this.mark(i, iprev);
    this.mark(j, jprev);
  }

  // Array color manipulations. These operations are not delayed
  mark(i, color = "red") {
    const { colorArray, setColorArray, index } = this;
    colorArray[i] = color;
    setColorArray(colorArray, index);
  }

  markPair(i, j, color = "red") {
    this.mark(i, color);
    this.mark(j, color);
  }

  markSection(begin, end, color) {
    const colorArray = this.colorArray;
    for (let i = begin; i <= end; i++) {
      colorArray[i] = color;
    }

    this.setColorArray(colorArray, this.index);
  }

  markAll(color) {
    const { colorArray, setColorArray, length, index } = this;
    for (let i = 0; i < length; i++) {
      colorArray[i] = color;
    }
    setColorArray(colorArray, index);
  }

  unmark(i) {
    this.mark(i, "white");
  }

  unmarkPair(i, j) {
    this.mark(i, "white");
    this.mark(j, "white");
  }

  unmarkSection(begin, end) {
    this.markSection(begin, end, "white");
  }

  unmarkAll() {
    this.markAll("white");
  }

  trackPointer(pointer, color) {
    pointer.setColor(color);
    this.pointers.push(pointer);
    this.mark(pointer, color);
  }

  untrackPointer(pointer) {
    const pointers = this.pointers;
    this.unmark(pointer);
    this.unmark(pointer.prev);
    pointers.splice(pointers.indexOf(pointer, 1));
  }

  untrackPointers(...pointers) {
    pointers.forEach((pointer) => this.untrackPointer(pointer));
  }

  untrackAllPointers() {
    this.colorTrackedPointers();
    const { pointers, colorArray, setColorArray } = this;

    for (let i = pointers.length - 1; i > -1; i--) {
      colorArray[pointers[i]] = "white";
      pointers.pop();
    }

    setColorArray(colorArray);
  }

  colorTrackedPointers() {
    const { pointers, colorArray, setColorArray } = this;

    pointers.forEach((pointer) => {
      colorArray[pointer] = pointer.color;
      if (pointer.prev !== -1) colorArray[pointer.prev] = "white";
    });

    setColorArray(colorArray);
  }

  async sorted() {
    for (let i = 0; i < 3; i++) {
      this.markSection(0, this.array.length - 1, "green");
      await sleep(250);
      this.markSection(0, this.array.length - 1, "white");
      await sleep(250);
    }
    this.setIsSorting(false, this.index);
  }
}

export default ArrayViewController;
