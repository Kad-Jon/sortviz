import React, { Component } from "react";
import "./styles/SortVizApp.css";
import "bootstrap/dist/css/bootstrap.css";
import Panel from "./Panel";
import ConfigBanner from "./ConfigBanner";
import { shuffledArray } from "../util/arrayGeneration";
import ArrayViewController from "../module/ArrayViewController";
import bubblesort from "../algorithms/bubblesort"
import insertionsort from "../algorithms/insertionsort";
import quicksort from "../algorithms/quicksort"
import mergesort from "../algorithms/mergesort";
import dualpivotquicksort from "../algorithms/dualpivotquicksort";
import selectionsort from "../algorithms/selectionsort";

class SortVizApp extends Component {
  constructor() {
    super();
    const initialSize = 64;
    const initialDelay = 35;
    this.state = {
      initialSize: initialSize,
      initialDelay: initialDelay,
      delay: initialDelay,
      areSorting: false,
      arrayviews: [
        {
          array: shuffledArray(initialSize),
          colorArray: Array(initialSize).fill("white"),
          selectedSortType: "bubble",
          isSorting: false,
          arrayAccesses: 0,
          size: initialSize,
        },
      ],
    };
  }

  render() {
    const { onClickSort, onChangeSize, onChangeDelay, onToggleSecondArray } = this;
    const { initialSize, initialDelay, areSorting } = this.state;

    return (
      <div className="SortVizApp container-fluid">
        <div id="title" className="page-header">
          <h1>Sorting Algorithm Visualizer</h1>
        </div>
        <ConfigBanner
          initialSize={initialSize}
          initialDelay={initialDelay}
          areSorting={areSorting}
          onClickSort={onClickSort.bind(this)}
          onChangeSize={onChangeSize.bind(this)}
          onChangeDelay={onChangeDelay.bind(this)}
          onToggleSecondArray={onToggleSecondArray.bind(this)}
        ></ConfigBanner>
        <ul>{this.createPanels()}</ul>
      </div>
    );
  }

  createPanels = () => {
    const setSelectedSortType = this.setSelectedSortType.bind(this);
    const arrayviews = this.state.arrayviews;
    const height = 80 / this.state.arrayviews.length + "vh";

    return arrayviews.map((arrayview, index) => {
      return (
        <li>
          <Panel
            key={index}
            index={index}
            height={height}
            array={arrayview.array}
            colorArray={arrayview.colorArray}
            selectedSortType={arrayview.selectedSortType}
            arrayAccesses={arrayview.arrayAccesses}
            setSortType={setSelectedSortType}
          ></Panel>
        </li>
      );
    });
  };

  onClickSort = async () => {
    const { arrayviews } = this.state;
    const callbacks = {
      getDelay: this.getDelay.bind(this),
      setArray: this.setArray.bind(this),
      setColorArray: this.setColorArray.bind(this),
      setArrayAccesses: this.setArrayAccesses.bind(this),
      setIsSorting: this.setIsSorting.bind(this),
    }

    this.setState({ areSorting: true });

    arrayviews.forEach(async (arrayview, index) => {
      const avc = new ArrayViewController(arrayview.array, arrayview.colorArray, index, callbacks);
      // this.setIsSorting(true, index);
      switch (arrayview.selectedSortType) {
        case "bubble":
          await bubblesort(avc);
          break;
        case "insertion":
          await insertionsort(avc);
          break;
        case "selection":
          await selectionsort(avc);
          break;
        case "merge":
          await mergesort(avc);
          break;
        case "quick":
          await quicksort(avc);
          break;
        case "dualpivotquick":
          await dualpivotquicksort(avc);
          break;
        default:
          break;
      }
      await avc.sorted();
    });
  };

  getDelay = () => {
    return this.state.delay;
  };

  // Config callback functions to configure the sort
  onChangeSize = (e) => {
    const shuffledArr = shuffledArray(e.target.value);
    const colorArray = Array(parseInt(e.target.value)).fill("white");

    for (let i = 0; i < this.state.arrayviews.length; i++) {
      this.setColorArray(colorArray.slice(), i);
      this.setArray(shuffledArr.slice(), i);
    }
  };

  onChangeDelay = (e) => {
    this.setState({ delay: e.target.value });
  };

  onToggleSecondArray = () => {
    if (this.state.arrayviews.length === 1) {
      const newPanels = this.state.arrayviews;
      newPanels.push(this.createDefaultPanelObject());
      this.setState({
        panels: newPanels,
      });
    } else {
      const newPanels = this.state.arrayviews;
      newPanels.pop();
      this.setState({ panels: newPanels });
    }
  };

  setArray = (array, viewIndex) => {
    this.setState((state) => ({
      arrayviews: state.arrayviews.map((arrayview, index) => {
        if (index === viewIndex) {
          return { ...arrayview, array: array };
        } else {
          return { ...arrayview };
        }
      }),
    }));
  };

  setColorArray = (colorArray, viewIndex) => {
    this.setState((state) => ({
      arrayviews: state.arrayviews.map((arrayview, index) => {
        if (index === viewIndex) {
          return { ...arrayview, colorArray: colorArray };
        } else {
          return { ...arrayview };
        }
      }),
    }));
  };

  setSelectedSortType = (sortType, viewIndex) => {
    this.setState((state) => ({
      arrayviews: state.arrayviews.map((arrayview, index) => {
        if (index === viewIndex) {
          return { ...arrayview, selectedSortType: sortType };
        } else {
          return { ...arrayview };
        }
      }),
    }));
  };

  setArrayAccesses = (arrayAccesses, viewIndex) => {
    this.setState((state) => ({
      arrayviews: state.arrayviews.map((arrayview, index) => {
        if (index === viewIndex) {
          return { ...arrayview, arrayAccesses: arrayAccesses };
        } else {
          return { ...arrayview };
        }
      }),
    }));
  };

  setIsSorting = (isSorting, viewIndex) => {
    this.setState((state) => ({
      arrayviews: state.arrayviews.map((arrayview, index) => {
        if (index === viewIndex) {
          return { ...arrayview, isSorting: isSorting };
        } else {
          return { ...arrayview };
        }
      }),
    }));

    let areStillSorting = false;

    this.state.arrayviews.forEach((arrayview) => {
      if (arrayview.isSorting === true) {
        areStillSorting = true;
      }
    });

    this.setState({ areSorting: areStillSorting });
  };

  createDefaultPanelObject = () => {
    const baseArray = this.state.arrayviews[0].array.slice();
    return {
      array: baseArray,
      colorArray: Array(baseArray.length).fill("white"),
      selectedSortType: "bubble",
      isSorting: false,
    };
  };

}

export default SortVizApp;
