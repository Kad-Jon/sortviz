import React, { Component } from "react";
import Histogram from "./Histogram";
import "./styles/Panel.css";
import SortTypeDropDown from "./SortTypeDropDown";

function Panel(props) {
  return (
    <div className="Panel" style={{ height: props.height }}>
      <SortTypeDropDown
        index={props.index}
        isSorting={props.isSorting}
        selectedSortType={props.selectedSortType}
        setSortType={props.setSortType}
      ></SortTypeDropDown>
      <ArrayView array={props.array}></ArrayView>
    </div>
  );
}

export default Panel;
