import React, { Component } from "react";
import ReactDOM from "react-dom";

class SortTypeDropDown extends Component {
    render() {
        const { selectedSortType, areSorting, index, onChangeSortType } = this.props;

        return (
            <form disabled={areSorting} onChange={onChangeSortType}>
                <select name={"sort-drp-down-" + index}>
                    <option value="bubble" selected={"bubble" === selectedSortType}>
                        Bubble
                    </option>
                    <option value="insertion" selected={"insertion" === selectedSortType}>
                        Insertion
                    </option>
                    <option value="selection" selected={"selection" === selectedSortType}>
                        Selection
                    </option>
                    <option value="merge" selected={"merge" === selectedSortType}>
                        Merge
                    </option>
                    <option value="quick" selected={"quick" === selectedSortType}>
                        Quick
                    </option>
                    <option value="dualpivotquick" selected={"dualpivotquick" === selectedSortType}>
                        Quick (dual pivot)
                    </option>
                    <option value="randomizedquick" selected={"randomizedquick" === selectedSortType}>
                        Quick (randomized)
                    </option>
                </select>
            </form>
        );
    }
}

export default SortTypeDropDown;
