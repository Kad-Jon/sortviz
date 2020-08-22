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
      <Histogram array={props.array} colorArray={props.colorArray} ></Histogram>
    </div>
  );
}

export default Panel;
