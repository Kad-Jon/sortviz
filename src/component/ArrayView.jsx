import React, { Component } from "react";
import Histogram from "./Histogram";
import { sleep } from "../util/sortutil";

class ArrayView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            array: props.array,
            colorArray: Array(props.array.length).fill("white"),
            delay: props.delay
        }
    }

    render() {
        const { array, colorArray }
        return (<Histogram array={array} colorArray={colorArray}></Histogram>);
    }

    // Getters
    getLength() {
        return this.state.array.length;
    }

    getDelay() {
        return this.state.delay;
    }

    async get(i) {
        await sleep(getDelay());
        return this.state.array[i];
    }

    // delay to be applied to async array manipulations
    async delay() {
        await sleep(getDelay());
    }

    // Array manipulations, each array read and write are delayed by one unit
    async set(i, val) {
        this.setState((state) => {
            const newArray = state.array;
            newArray[i] = val;
            return {
                array: newArray
            }
        })
        await sleep(getDelay());
    }

    async swap(i, j) {
        let tmp = await this.get(i);
        await this.set(j, i);
        await this.set(i, tmp);
    }

    // Array color manipulations. These operations are not delayed
    mark(i, color) {
        this.setState((state) => {
            const newColorArray = state.colorArray;
            newColorArray[i] = color;
            return {
                colorArray: newColorArray
            }
        })
    }

    mark(i) {
        this.mark(i, "red");
    }

    markSorted(i) {
        this.mark(i, "green");
    }


    unmark(i) {
        this.mark(i, "white");
    }

    sorted() {

    }


}

export default ArrayView;