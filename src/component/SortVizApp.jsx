import React, { Component } from "react";

import Panel from "./Panel";
import ConfigBanner from "./ConfigBanner";

import arrayGenerators from "../util/arrayGeneration";
import sortingAlgorithms from "../algorithms/sortingAlgorithms";
import ArrayViewController from "../module/ArrayViewController";

import { shuffleArray } from "../util/sortutil";

import "./styles/SortVizApp.css";
import "bootstrap/dist/css/bootstrap.css";

class SortVizApp extends Component {
    constructor() {
        super();
        const initialSize = 64;
        const initialDelay = 35;
        const initialDataSet = "linear";
        const initialShuffle = "shuffled";
        const initialArray = this.generateArray(initialDataSet, initialSize, initialShuffle);
        const initialColorArray = Array(initialSize).fill("white");
        const initialSelectedSortType = "bubble";
        const initialMaxVal = Math.max(...initialArray);
        this.state = {
            size: initialSize,
            dataSet: initialDataSet,
            shuffle: initialShuffle,
            delay: initialDelay,
            areSorting: false,
            arrayviews: [
                {
                    array: initialArray,
                    colorArray: initialColorArray,
                    sortType: initialSelectedSortType,
                    isSorting: false,
                    arrayAccesses: 0,
                    dataSet: initialDataSet,
                    shuffle: initialShuffle,
                    maxVal: initialMaxVal,
                },
            ],
        };
    }

    // Application is composed of a config banner and a list of panels containing array views
    // Configuration is supplied at the top level config banner and applies the config to all arrays
    // But also each panel supplies a config banner for its contained array view (save for delay, which is global)
    render() {
        const {
            onClickSort,
            onChangeSizes,
            onChangeDelay,
            setDataSets,
            onChangeShuffles,
            onClickGenerateArrays,
            onToggleSecondArray,
        } = this;
        const { areSorting } = this.state;
        const sign = this.state.arrayviews.length === 1 ? "ADD" : "REMOVE";

        return (
            <div className="SortVizApp container-fluid">
                <div id="title" className="page-header">
                    <h1>Sorting Algorithm Visualizer</h1>
                </div>
                <ConfigBanner
                    initialSize={64}
                    initialDelay={35}
                    dataSet={"linear"}
                    shuffle={"shuffled"}
                    areSorting={areSorting}
                    onClickSort={onClickSort}
                    onChangeSize={onChangeSizes}
                    onChangeDelay={onChangeDelay}
                    onClickGenerateArrays={onClickGenerateArrays}
                    setDataSets={setDataSets}
                    onChangeShuffles={onChangeShuffles}
                ></ConfigBanner>
                <ul>{this.createPanels()}</ul>
                <button id="arr-toggle-btn" disabled={areSorting} onClick={onToggleSecondArray}>
                    {sign}
                </button>
            </div>
        );
    }

    createPanels = () => {
        const setSortType = this.setSortType;
        const onChangeSortType = this.onChangeSortType;
        const arrayviews = this.state.arrayviews;
        const height = 70 / this.state.arrayviews.length + "vh";

        return arrayviews.map((arrayview, index) => {
            const { array, colorArray, sortType, arrayAccesses, maxVal } = arrayview;
            return (
                <li>
                    <Panel
                        key={index}
                        index={index}
                        maxVal={maxVal}
                        height={height}
                        array={array}
                        colorArray={colorArray}
                        selectedSortType={sortType}
                        arrayAccesses={arrayAccesses}
                        setSortType={setSortType}
                        onChangeSortType={onChangeSortType(index)}
                    ></Panel>
                </li>
            );
        });
    };

    getDelay = () => {
        return this.state.delay;
    };

    getArrayViewCallbacks = (i) => {
        return {
            getDelay: this.getDelay,
            setArray: this.setArray,
            setColorArray: this.setColorArray,
            setArrayAccesses: this.setArrayAccesses,
            setIsSorting: this.setIsSorting,
        };
    };

    // Config callback functions to configure the sort

    onClickGenerateArrays = () => {
        const array = this.generateArray(this.state.dataSet, this.state.size, this.state.shuffle);
        const colorArray = Array(parseInt(array.length)).fill("white");
        const maxVal = Math.max(...array);

        for (let i = 0; i < this.state.arrayviews.length; i++) {
            this.setColorArray(colorArray.slice(), i);
            this.setArray(array.slice(), i);
            this.setArrayAccesses(0, i);
            this.setMaxVal(maxVal, i);
        }
    };

    onClickSort = () => {
        const { arrayviews } = this.state;

        this.setState({ areSorting: true });

        arrayviews.forEach((arrayview, index) => {
            const callbacks = this.getArrayViewCallbacks();
            this.setArrayViewProperty("isSorting", true, index);
            const avc = new ArrayViewController(arrayview.array, arrayview.colorArray, index, callbacks);

            const sortingAlgorithm = sortingAlgorithms[arrayview.sortType];
            sortingAlgorithm(avc);
        });
    };

    onChangeSizes = (e) => {
        const arr = this.generateArray(this.state.dataSet, e.target.value, this.state.shuffle);
        const colorArray = Array(parseInt(e.target.value)).fill("white");
        const maxVal = Math.max(...arr);

        this.setState({ size: e.target.value });
        for (let i = 0; i < this.state.arrayviews.length; i++) {
            this.setColorArray(colorArray.slice(), i);
            this.setArray(arr.slice(), i);
            this.setArrayAccesses(0, i);
            this.setMaxVal(maxVal, i);
        }
    };

    onChangeDelay = (e) => {
        this.setState({ delay: e.target.value });
    };

    onToggleSecondArray = () => {
        if (this.state.arrayviews.length === 1) {
            const newArrayViews = this.state.arrayviews;
            newArrayViews.push(this.createDefaultArrayView());
            this.setState({
                arrayviews: newArrayViews,
            });
        } else {
            const newPanels = this.state.arrayviews;
            newPanels.pop();
            this.setState({ arrayviews: newPanels });
        }
    };

    onChangeSortType = (index) => {
        return (e) => {
            this.setSortType(e.target.value, index);
        };
    };

    onChangeSize = (index) => {
        return (e) => {
            this.setSize(e.target.value, index);
        };
    };

    onChangeShuffles = (e) => {
        this.setShuffles(e.target.value);
    };

    setArrayViewProperty = (name, value, viewIndex) => {
        this.setState((state) => ({
            arrayviews: state.arrayviews.map((arrayview, index) => {
                if (index === viewIndex) {
                    return { ...arrayview, [name]: value };
                } else {
                    return { ...arrayview };
                }
            }),
        }));
    };

    setArrayViewProperties = (name, value) => {
        this.setState((state) => ({
            arrayviews: state.arrayviews.map((arrayview) => {
                return { ...arrayview, [name]: value };
            }),
        }));
    };

    setArray = (array, viewIndex) => {
        this.setArrayViewProperty("array", array, viewIndex);
    };

    setColorArray = (colorArray, viewIndex) => {
        this.setArrayViewProperty("colorArray", colorArray, viewIndex);
    };

    setSortType = (sortType, viewIndex) => {
        this.setArrayViewProperty("sortType", sortType, viewIndex);
    };

    setDataSet = (dataSet, viewIndex) => {
        this.setArrayViewProperty("dataSet", dataSet, viewIndex);
    };

    setDataSets = (dataSet) => {
        this.setArrayViewProperties("dataSet", dataSet);
        this.setState({ dataSet: dataSet });
    };

    setShuffle = (shuffle, viewIndex) => {
        this.setArrayViewProperty("shuffle", shuffle, viewIndex);
    };

    setShuffles = (shuffle) => {
        this.setArrayViewProperties("shuffle", shuffle);
        this.setState({ shuffle: shuffle });
    };

    setArrayAccesses = (arrayAccesses, viewIndex) => {
        this.setArrayViewProperty("arrayAccesses", arrayAccesses, viewIndex);
    };

    setMaxVal = (maxVal, viewIndex) => {
        this.setArrayViewProperty("maxVal", maxVal, viewIndex);
    };

    setIsSorting = (isSorting, viewIndex) => {
        this.setArrayViewProperty("isSorting", isSorting, viewIndex);

        const areStillSorting = this.state.arrayviews.some((arrayview) => arrayview.isSorting);

        this.setState({ areSorting: areStillSorting });
    };

    generateArray(dataSet, size, shuffle) {
        const generatorResult = arrayGenerators[dataSet];
        const arr = generatorResult(size);

        switch (shuffle) {
            case "shuffled":
                shuffleArray(arr);
                break;
            case "reversed":
                arr.sort((a, b) => b - a);
                break;
            case "sorted":
                arr.sort((a, b) => a - b);
                break;
            default:
                break;
        }
        return arr;
    }

    createDefaultArrayView = () => {
        const basearrayview = this.state.arrayviews[0];
        return {
            array: basearrayview.array.slice(),
            colorArray: basearrayview.colorArray.slice(),
            dataSet: basearrayview.dataSet,
            maxVal: basearrayview.maxVal,
            shuffle: basearrayview.shuffle,
            sortType: basearrayview.sortType,
            isSorting: false,
            arrayAccesses: 0,
        };
    };
}

export default SortVizApp;
