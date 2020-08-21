import React, { Component } from "react";
import "./styles/SortVizApp.css";
import "bootstrap/dist/css/bootstrap.css";
import Panel from "./Panel";
import ConfigBanner from "./ConfigBanner";
import { shuffledArray, reverseSortedArray } from "../util/arrayGeneration";
import bubbleSort from "../algorithms/bubbleSort";
import quickSort from "../algorithms/quickSort";
import insertionSort from "../algorithms/insertionSort";
import mergeSort from "../algorithms/mergeSort";
import dualPivotQuickSort from "../algorithms/dualPivotQuickSort";

class SortVizApp extends Component {
  constructor() {
    super();
    const initialSize = 100;
    this.state = {
      panels: [
        {
          array: shuffledArray(initialSize),
          colorArray: Array(initialSize).fill("white"),
          selectedSortType: "bubble",
          isSorting: false,
        },
      ],
      delay: 0,
      isSorting: false,
    };
  }

  render() {
    return (
      <div className="SortVizApp container-fluid">
        <div id="title" className="page-header">
          <h1>Sorting Algorithm Visualizer</h1>
        </div>
        <ConfigBanner
          onClickSort={this.onClickSort.bind(this)}
          onChangeSize={this.onChangeSize.bind(this)}
          onChangeDelay={this.onChangeDelay.bind(this)}
          isSorting={this.state.isSorting}
          toggleSecondArray={this.toggleSecondArray.bind(this)}
        ></ConfigBanner>
        <ul>{this.createPanels()}</ul>
      </div>
    );
  }

  createPanels = () => {
    const height = 80 / this.state.panels.length + "vh";
    return this.state.panels.map((panel, index) => {
      return (
        <li>
          <Panel
            height={height}
            selectedSortType={panel.selectedSortType}
            setSortType={this.setSelectedSortType.bind(this)}
            key={index}
            array={panel.array}
            colorArray={panel.colorArray}
            index={index}
          ></Panel>
        </li>
      );
    });
  };

  onClickSort = () => {
    this.setState({ isSorting: true });
    this.setState((state) => ({
      panels: state.panels.map((panel) => {
        return { ...panel, isSorting: true };
      }),
    }));

    const callbacks = {
      setArray: this.setArray.bind(this),
      setColorArray: this.setColorArray.bind(this),
      delay: this.getDelay.bind(this),
      setIsSorting: this.setIsSorting.bind(this),
    };

    this.state.panels.forEach((panel, index) => {
      const { array, colorArray, selectedSortType } = panel;
      switch (selectedSortType) {
        case "bubble":
          bubbleSort(array, colorArray, index, callbacks);
          break;
        case "quick":
          quickSort(array, colorArray, index, callbacks);
          break;
        case "merge":
          mergeSort(array, colorArray, index, callbacks);
          break;
        case "insertion":
          insertionSort(array, colorArray, index, callbacks);
          break;
        case "dualpivotquicksort":
          dualPivotQuickSort(array, colorArray, index, callbacks);
          break;
        default:
          break;
      }
    });
  };

  setArray = (array, panelIndex) => {
    this.setState((state) => ({
      panels: state.panels.map((panel, index) => {
        if (index === panelIndex) {
          return { ...panel, array: array };
        } else {
          return { ...panel };
        }
      }),
    }));
  };

  setColorArray = (colorArray, panelIndex) => {
    this.setState((state) => ({
      panels: state.panels.map((panel, index) => {
        if (index === panelIndex) {
          return { ...panel, colorArray: colorArray };
        } else {
          return { ...panel };
        }
      }),
    }));
  };

  setSelectedSortType = (sortType, panelIndex) => {
    this.setState((state) => ({
      panels: state.panels.map((panel, index) => {
        if (index === panelIndex) {
          return { ...panel, selectedSortType: sortType };
        } else {
          return { ...panel };
        }
      }),
    }));
  };

  setIsSorting = (isSorting, panelIndex) => {
    this.setState((state) => ({
      panels: state.panels.map((panel, index) => {
        if (index === panelIndex) {
          return { ...panel, isSorting: isSorting };
        } else {
          return { ...panel };
        }
      }),
    }));

    let isStillSorting = false;

    this.state.panels.forEach((panel) => {
      if (panel.isSorting === true) {
        isStillSorting = true;
      }
    });

    this.setState({ isSorting: isStillSorting });
  };

  getDelay = () => {
    return this.state.delay;
  };

  // Config callback functions to configure the sort
  onChangeSize = (e) => {
    const shuffledArr = shuffledArray(e.target.value);
    const colorArray = Array(parseInt(e.target.value)).fill("white");

    for (let i = 0; i < this.state.panels.length; i++) {
      this.setColorArray(colorArray.slice(), i);
      this.setArray(shuffledArr.slice(), i);
    }
  };

  onChangeDelay = (e) => {
    this.setState({ delay: e.target.value });
  };

  toggleSecondArray = () => {
    if (this.state.panels.length === 1) {
      const newPanels = this.state.panels;
      newPanels.push(this.createDefaultPanelObject());
      this.setState({
        panels: newPanels,
      });
    } else {
      const newPanels = this.state.panels;
      newPanels.pop();
      this.setState({ panels: newPanels });
    }
  };

  createDefaultPanelObject = () => {
    const baseArray = this.state.panels[0].array.slice();
    return {
      array: baseArray,
      colorArray: Array(baseArray.length).fill("white"),
      selectedSortType: "bubble",
      isSorting: false,
    };
  };
}

export default SortVizApp;
