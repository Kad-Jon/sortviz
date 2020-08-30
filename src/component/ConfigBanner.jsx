import React from "react";
import "./styles/ConfigBanner.css";
import DataSetDropDown from "./DataSetDropDown";
import ShuffleDropDown from "./ShuffleDropDown";

function ConfigBanner(props) {
    const {
        initialSize,
        initialDelay,
        areSorting,
        onClickSort,
        onChangeSize,
        onChangeDelay,
        onClickGenerateArrays,
    } = props;
    return (
        <div className="ConfigBanner container-fluid">
            <div className="row">
                <div className="col-9">
                    <text>Size: </text>
                    <input
                        id="size-slider"
                        onChange={onChangeSize}
                        defaultValue={initialSize}
                        type="range"
                        min="8"
                        max="256"
                        disabled={areSorting}
                    ></input>
                    <DataSetDropDown dataSet={props.dataSet} setDataSets={props.setDataSets}></DataSetDropDown>
                    <ShuffleDropDown shuffle={props.shuffle} setShuffles={props.setShuffles}></ShuffleDropDown>
                    <button onClick={onClickGenerateArrays} disabled={areSorting}>
                        Generate
                    </button>
                </div>
                <div className="col-3 sort-controls">
                    <button id="sort-btn" onClick={onClickSort} disabled={areSorting}>
                        Sort
                    </button>
                    <text>Speed: </text>
                    <input
                        id="speed-slider"
                        defaultValue={initialDelay}
                        onMouseUp={onChangeDelay}
                        type="range"
                        min="0"
                        max="500"
                    ></input>
                </div>
            </div>
        </div>
    );
}

export default ConfigBanner;
