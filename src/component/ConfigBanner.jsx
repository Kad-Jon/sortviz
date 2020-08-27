import React from "react";
import "./styles/ConfigBanner.css";

function ConfigBanner(props) {
  const {
    initialSize,
    initialDelay,
    areSorting,
    onClickSort,
    onChangeSize,
    onChangeDelay,
    onToggleSecondArray,
  } = props;
  return (
    <div className="ConfigBanner">
      <text>Size: </text>
      <input
        id="size-slider"
        onChange={onChangeSize}
        defaultValue={initialSize}
        type="range"
        min="8"
        max="128"
        disabled={areSorting}
      ></input>
      <button>Generate</button>
      <text>Speed: </text>
      <input
        id="speed-slider"
        defaultValue={initialDelay}
        onMouseUp={onChangeDelay}
        type="range"
        min="0"
        max="500"
      ></input>
      <button onClick={onClickSort} disabled={areSorting}>
        Sort
      </button>
      <button onClick={onToggleSecondArray} disabled={areSorting}>
        Toggle Second Array
      </button>
    </div>
  );
}

export default ConfigBanner;
