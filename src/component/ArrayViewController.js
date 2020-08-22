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
  }

  // Getters

  getArray() {
    return this.array;
  }

  getColorArray() {
    return this.colorArray;
  }

  getLength() {
    return this.array.length;
  }

  async get(i, color = "red") {
    const prevColor = this.colorArray[i];
    this.mark(i, color);
    await this.delay();
    this.mark(i, prevColor);
    return this.array[i];
  }

  async compare(i, j, color = "red") {
    this.markPair(i, j, color);
    await this.delay(2);
    this.unmarkPair(i, j);

    const leftVal = this.array[i];
    const rightVal = this.array[j];

    if (leftVal === rightVal) {
      return 0;
    } else if (leftVal > rightVal) {
      return 1;
    } else {
      return -1;
    }
  }

  async compareElementToVal(i, val, color = "red") {
    const prevColor = this.colorArray[i];
    this.mark(i, color);
    await this.delay();
    this.mark(i, prevColor);
    const elementVal = this.array[i];

    if (elementVal === val) {
      return 0;
    } else if (elementVal > val) {
      return 1;
    } else {
      return -1;
    }
  }

  // delay to be applied to async array manipulations
  async delay(multiplier = 1) {
    await sleep(this.getDelay() * multiplier);
  }

  // Array manipulations. Each array read and write are delayed by one unit
  async set(i, val, color = "red") {
    const { array, colorArray, setArray, index } = this;
    const prevColor = colorArray[i];
    this.mark(i, color);
    array[i] = val;
    setArray(array, index);
    await this.delay();
    this.mark(i, prevColor);
  }

  async swap(i, j, color = "blue") {
    const { array, colorArray, setArray, index } = this;

    const iprev = colorArray[i];
    const jprev = colorArray[j];

    this.markPair(i, j, color);

    let tmp = array[i];
    await this.delay();
    array[i] = array[j];
    setArray(array);
    await this.delay(2);
    array[j] = tmp;
    setArray(array);
    await this.delay();

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

  unmarkPair(i, j) {
    this.mark(i, "white");
    this.mark(j, "white");
  }

  markSorted(i) {
    console.log(this.array[i]);
    this.mark(i, "green");
  }

  unmark(i) {
    this.mark(i, "white");
  }

  unmarkAllNonSorted() {
    const { colorArray, setColorArray, length, index } = this;
    for (let i = 0; i < length; i++) {
      if (colorArray[i] != "green") {
        colorArray[i] = "white";
      }
    }
    this.setColorArray(colorArray, index);
  }

  markSection(begin, end, color) {
    const colorArray = this.colorArray;
    for (let i = begin; i <= end; i++) {
      colorArray[i] = color;
    }

    this.setColorArray(this.colorArray);
  }

  async sorted() {
    for (let i = 0; i < 3; i++) {
      this.markSection(0, this.array.length - 1, "green");
      await sleep(250);
      this.markSection(0, this.array.length - 1, "white");
      await sleep(250);
    }
  }
}

export default ArrayViewController;
