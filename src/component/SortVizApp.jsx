import React, { Component } from "react";
import "./styles/SortVizApp.css";
import "bootstrap/dist/css/bootstrap.css";
import Panel from "./Panel";
import ConfigBanner from "./ConfigBanner";
import { shuffledArray } from "../util/arrayGeneration";
import ArrayViewController from "./ArrayViewController";
import bubblesort from "../algorithms/bubble-sort"
import insertionsort from "../algorithms/insertion-sort";
import quicksort from "../algorithms/quick-sort"
import mergesort from "../algorithms/merge-sort";

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
      delay: 35,
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

            array={panel.array}
            colorArray={panel.colorArray}

            selectedSortType={panel.selectedSortType}
            setSortType={this.setSelectedSortType.bind(this)}

            key={index}
            index={index}
          ></Panel>
        </li>
      );
    });
  };

  onClickSort = () => {
    const { panels } = this.state;
    const callbacks = {
      getDelay: this.getDelay.bind(this),
      setArray: this.setArray.bind(this),
      setColorArray: this.setColorArray.bind(this),
    }

    panels.forEach(async (panel, index) => {
      const avc = new ArrayViewController(panel.array, panel.colorArray, index, callbacks);
      switch (panel.selectedSortType) {
        case "bubble":
          await bubblesort(avc);
          break;
        case "insertion":
          await insertionsort(avc);
          break;
        case "quick":
          await quicksort(avc);
          break;
        case "merge":
          await mergesort(avc);
          break;
        default:
          break;
      }
      avc.sorted();
    });
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
