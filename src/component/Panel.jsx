import React from "react";
import Histogram from "./Histogram";
import "./styles/Panel.css";
import SortTypeDropDown from "./SortTypeDropDown";
import ShuffleDropDown from "./ShuffleDropDown";
import DataSetDropDown from "./DataSetDropDown";

function Panel(props) {
    return (
        <div className="Panel" style={{ height: props.height }}>
            <SortTypeDropDown
                index={props.index}
                isSorting={props.isSorting}
                selectedSortType={props.selectedSortType}
                onChangeSortType={props.onChangeSortType}
            ></SortTypeDropDown>
            <Histogram array={props.array} colorArray={props.colorArray} maxVal={props.maxVal}></Histogram>
            <text hidden={props.arrayAccesses === 0}>Array Accesses: {props.arrayAccesses}</text>
        </div>
    );
}

export default Panel;
