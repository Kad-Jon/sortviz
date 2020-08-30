import React, { Component } from "react";
import ReactDOM from "react-dom";

class ShuffleDropDown extends Component {
    render() {
        const { shuffle, setShuffles, index } = this.props;

        return (
            <form onChange={setShuffles}>
                <select name={"data-set-drp-down" + index}>
                    <option value="shuffled" selected={"shuffled" === shuffle}>
                        Shuffled
                    </option>
                    <option value="unshuffled" selected={"unshuffled" === shuffle}>
                        Unshuffled
                    </option>
                    <option value="reversed" selected={"reversed" === shuffle}>
                        Reverse Sorted
                    </option>
                    <option value="sorted" selected={"sorted" === shuffle}>
                        Sorted
                    </option>
                </select>
            </form>
        );
    }
}

export default ShuffleDropDown;
