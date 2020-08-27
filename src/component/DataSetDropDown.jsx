import React, { Component } from "react";
import ReactDOM from "react-dom";

class DataSetDropDown extends Component {
  componentDidMount() {
    ReactDOM.findDOMNode(this).addEventListener("change", (e) =>
      this.props.selectedDataSet(e.target.value, this.props.index)
    );
  }

  render() {
    const { selectedSortType: selectedDataSet, isSorting, index } = this.props;

    return (
      <form disabled={isSorting}>
        <select name={"data-set-drp-down" + index}>
          <option
            value="linear-shuffled"
            selected={"linear-shuffled" === selectedDataSet}
          >
            Random
          </option>
          <option value="random" selected={"random" === selectedDataSet}>
            Linear
          </option>
          <option value="random" selected={"random" === selectedDataSet}>
            Quadratic
          </option>
          <option value="random" selected={"random" === selectedDataSet}>
            Cubic
          </option>
          <option value="random" selected={"random" === selectedDataSet}>
            Quartic
          </option>
          <option value="random" selected={"random" === selectedDataSet}>
            Quintic
          </option>
        </select>
      </form>
    );
  }
}

export default DataSetDropDown;
