export default class ArrayPointer {
  constructor(index) {
    this.curr = index;
    this.prev = -1;
    this.color = "white";
  }

  setColor(color) {
    this.color = color;
  }

  increment() {
    this.prev = this.curr;
    this.curr = this.curr + 1;
  }

  decrement() {
    this.prev = this.curr;
    this.curr = this.curr - 1;
  }

  pointTo(index) {
    this.prev = this.curr;
    this.curr = index;
  }

  valueOf() {
    return this.curr;
  }

  toString() {
    return this.curr;
  }
}
