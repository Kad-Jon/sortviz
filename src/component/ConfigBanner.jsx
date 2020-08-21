import React from "react";
import "./styles/ConfigBanner.css";

function ConfigBanner(props) {
  return (
    <div className="ConfigBanner">
      <text>Size: </text>
      <input
        id="size-slider"
        onChange={props.onChangeSize}
        defaultValue="100"
        type="range"
        min="8"
        max="700"
        disabled={props.isSorting}
      ></input>
      <text>Speed: </text>
      <input
        id="speed-slider"
        defaultValue="0"
        onMouseUp={props.onChangeDelay}
        type="range"
        min="0"
        max="1000"
      ></input>
      <button onClick={props.onClickSort} disabled={props.isSorting}>
        Sort
      </button>
      <button onClick={props.toggleSecondArray} disabled={props.isSorting}>
        Toggle Second Array
      </button>
    </div>
  );
}

export default ConfigBanner;
