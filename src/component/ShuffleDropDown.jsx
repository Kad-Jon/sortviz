import React, { Component } from "react";

class ShuffleDropDown extends Component {
    render() {
        const { shuffle, onChangeShuffles, index } = this.props;

        return (
            <form onChange={onChangeShuffles}>
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
