import React, { Component } from "react";
import "./styles/SortVizApp.css";
import "bootstrap/dist/css/bootstrap.css";
import Panel from "./Panel";
import ConfigBanner from "./ConfigBanner";
import { randomArray } from "../util/arrayGeneration";
import ArrayViewController from "../module/ArrayViewController";
import bubblesort from "../algorithms/bubblesort";
import insertionsort from "../algorithms/insertionsort";
import quicksort from "../algorithms/quicksort";
import mergesort from "../algorithms/mergesort";
import dualpivotquicksort from "../algorithms/dualpivotquicksort";
import selectionsort from "../algorithms/selectionsort";

class SortVizApp extends Component {
  constructor() {
    super();
    const initialSize = 64;
    const initialDelay = 35;
    const initialArray = randomArray(initialSize);
    const initialColorArray = Array(initialSize).fill("white");
    const initialSelectedSortType = "bubble";
    const initialMaxVal = Math.max(...initialArray);
    this.state = {
      delay: initialDelay,
      areSorting: false,
      arrayviews: [
        {
          array: initialArray,
          colorArray: initialColorArray,
          selectedSortType: initialSelectedSortType,
          isSorting: false,
          arrayAccesses: 0,
          maxVal: initialMaxVal,
        },
      ],
    };
  }

  render() {
    const {
      onClickSort,
      onChangeSize,
      onChangeDelay,
      onToggleSecondArray,
    } = this;
    const { initialSize, initialDelay, areSorting } = this.state;

    return (
      <div className="SortVizApp container">
        <div id="title" className="page-header">
          <h1>Sorting Algorithm Visualizer</h1>
        </div>
        <ConfigBanner
          initialSize={64}
          initialDelay={35}
          areSorting={areSorting}
          onClickSort={onClickSort}
          onChangeSize={onChangeSize}
          onChangeDelay={onChangeDelay}
          onToggleSecondArray={onToggleSecondArray}
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
      getDelay: this.getDelay,
      setArray: this.setArray,
      setColorArray: this.setColorArray,
      setArrayAccesses: this.setArrayAccesses,
      setIsSorting: this.setIsSorting,
    };

    this.setState({ areSorting: true });

    arrayviews.forEach(async (arrayview, index) => {
      const avc = new ArrayViewController(
        arrayview.array,
        arrayview.colorArray,
        index,
        callbacks
      );
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
    const shuffledArr = randomArray(e.target.value, 3);
    const colorArray = Array(parseInt(e.target.value)).fill("white");

    this.setState({ size: e.target.value });

    for (let i = 0; i < this.state.arrayviews.length; i++) {
      this.setColorArray(colorArray.slice(), i);
      this.setArray(shuffledArr.slice(), i);
      this.setArrayAccesses(0, i);
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
    const basearrayview = this.state.arrayviews[0];
    return {
      array: basearrayview.array.slice(),
      colorArray: basearrayview.colorArray.slice(),
      selectedSortType: basearrayview.selectedSortType,
      isSorting: false,
      arrayAccesses: 0,
    };
  };
}

export default SortVizApp;
