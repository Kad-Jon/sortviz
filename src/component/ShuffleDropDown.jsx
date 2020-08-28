import React, { Component } from "react";
import ReactDOM from "react-dom";

class ShuffleDropDown extends Component {
    componentDidMount() {
        const domNode = ReactDOM.findDOMNode(this);

        if (this.props.setShuffle) {
            domNode.addEventListener("change", (e) => this.props.setShuffle(e.target.value, this.props.index));
        } else {
            domNode.addEventListener("change", (e) => this.props.setShuffles(e.target.value));
        }
    }

    render() {
        const { shuffle, isSorting, index } = this.props;

        return (
            <form disabled={isSorting}>
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
