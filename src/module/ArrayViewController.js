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
    delay = async (multiplier = 1) => {
        await sleep(this.getDelay() * multiplier);
    };

    // Animated array manipulations. Each array read and write are delayed by one unit and
    // highlighted with tracked elements are refreshed before and after any manipulation

    get = async (i, color = "red") => {
        const { array, colorArray, setArrayAccesses, index, colorTrackedPointers, mark, delay } = this;
        let { arrayAccesses } = this;

        colorTrackedPointers();

        const prevColor = colorArray[i];
        mark(i, color);
        await delay();
        mark(i, prevColor);

        setArrayAccesses(++arrayAccesses, index);
        this.arrayAccesses = arrayAccesses;

        return array[i];
    };

    compare = async (i, j, color = "red") => {
        const { markPair, unmarkPair, get, compareVals } = this;

        markPair(i, j, color);
        const leftVal = await get(i, color);
        const rightVal = await get(j, color);
        unmarkPair(i, j);

        return compareVals(leftVal, rightVal);
    };

    compareToVal = async (i, val, color = "red") => {
        const { get } = this;
        const elementVal = await get(i, color);
        return this.compareVals(elementVal, val);
    };

    compareVals = async (valOne, valTwo) => {
        const lessThan = -1;
        const equal = 0;
        const moreThan = 1;

        if (valOne > valTwo) return moreThan;
        if (valOne < valTwo) return lessThan;
        return equal;
    };

    set = async (i, val, color = "red") => {
        const { array, setArray, colorArray, index, setArrayAccesses, colorTrackedPointers, mark, delay } = this;
        let { arrayAccesses } = this;

        colorTrackedPointers();

        const prevColor = colorArray[i];
        mark(i, color);
        array[i] = val;
        setArray(array, index);
        await delay();
        mark(i, prevColor);

        setArrayAccesses(++arrayAccesses, index);
        this.arrayAccesses = arrayAccesses;
    };

    swap = async (i, j, color = "blue") => {
        if (i === j) return;
        const { colorArray, colorTrackedPointers, mark, markPair, get, set } = this;

        colorTrackedPointers();

        const iprev = colorArray[i];
        const jprev = colorArray[j];
        markPair(i, j, color);

        const tmp = await get(i, color);
        const jVal = await get(j, color);
        await set(i, jVal, color);
        await set(j, tmp, color);

        mark(i, iprev);
        mark(j, jprev);
    };

    // Array color manipulations. These operations are not delayed
    mark = (i, color = "red") => {
        const { colorArray, setColorArray, index } = this;
        colorArray[i] = color;
        setColorArray(colorArray, index);
    };

    markPair = (i, j, color = "red") => {
        this.mark(i, color);
        this.mark(j, color);
    };

    markSection = (begin, end, color) => {
        const colorArray = this.colorArray;
        for (let i = begin; i <= end; i++) {
            colorArray[i] = color;
        }

        this.setColorArray(colorArray, this.index);
    };

    markAll = (color) => {
        const { colorArray, setColorArray, length, index } = this;
        for (let i = 0; i < length; i++) {
            colorArray[i] = color;
        }
        setColorArray(colorArray, index);
    };

    unmark = (i) => {
        this.mark(i, "white");
    };

    unmarkPair = (i, j) => {
        this.mark(i, "white");
        this.mark(j, "white");
    };

    unmarkSection = (begin, end) => {
        this.markSection(begin, end, "white");
    };

    unmarkAll = () => {
        this.markAll("white");
    };

    trackPointer = (pointer, color) => {
        pointer.setColor(color);
        this.pointers.push(pointer);
        this.mark(pointer, color);
    };

    untrackPointer = (pointer) => {
        const pointers = this.pointers;
        this.unmark(pointer);
        this.unmark(pointer.prev);
        pointers.splice(pointers.indexOf(pointer, 1));
    };

    untrackPointers = (...pointers) => {
        pointers.forEach((pointer) => this.untrackPointer(pointer));
    };

    untrackAllPointers = () => {
        this.colorTrackedPointers();
        const { pointers, colorArray, setColorArray } = this;

        for (let i = pointers.length - 1; i > -1; i--) {
            colorArray[pointers[i]] = "white";
            pointers.pop();
        }

        setColorArray(colorArray);
    };

    colorTrackedPointers = () => {
        const { pointers, colorArray, setColorArray } = this;

        pointers.forEach((pointer) => {
            colorArray[pointer] = pointer.color;
            if (pointer.prev !== -1) colorArray[pointer.prev] = "white";
        });

        setColorArray(colorArray);
    };

    sorted = async () => {
        for (let i = 0; i < 3; i++) {
            this.markSection(0, this.array.length - 1, "green");
            await sleep(250);
            this.markSection(0, this.array.length - 1, "white");
            await sleep(250);
        }
        this.setIsSorting(false, this.index);
    };
}

export default ArrayViewController;
