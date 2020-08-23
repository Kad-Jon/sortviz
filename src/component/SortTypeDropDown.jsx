import React, { Component } from "react";
import ReactDOM from "react-dom";

class SortTypeDropDown extends Component {
  componentDidMount() {
    ReactDOM.findDOMNode(this).addEventListener("change", (e) =>
      this.props.setSortType(e.target.value, this.props.index)
    );
  }

  render() {
    const { selectedSortType, isSorting, index } = this.props;

    return (
      <form disabled={isSorting}>
        <select name={"sort-drp-down-" + index}>
          <option value="bubble" selected={"bubble" === selectedSortType}>
            Bubble
          </option>
          <option value="insertion" selected={"insertion" === selectedSortType}>
            Insertion
          </option>
          <option value="merge" selected={"merge" === selectedSortType}>
            Merge
          </option>
          <option value="quick" selected={"quick" === selectedSortType}>
            Quick
          </option>
          <option
            value="dualpivotquick"
            selected={"dualpivotquick" === selectedSortType}
          >
            Quick (dual pivot)
          </option>
        </select>
      </form>
    );
  }
}

export default SortTypeDropDown;
