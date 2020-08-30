import React, { Component } from "react";
import ReactDOM from "react-dom";

class DataSetDropDown extends Component {
    componentDidMount() {
        const domNode = ReactDOM.findDOMNode(this);

        if (this.props.setDataSet) {
            domNode.addEventListener("change", (e) => this.props.setDataSet(e.target.value, this.props.index));
        } else {
            domNode.addEventListener("change", (e) => this.props.setDataSets(e.target.value));
        }
    }

    render() {
        const { dataSet, areSorting, index } = this.props;

        return (
            <form disabled={areSorting}>
                <select name={"data-set-drp-down" + index}>
                    <option value="random" selected={"random" === dataSet}>
                        Random
                    </option>
                    <option value="linear" selected={"linear" === dataSet}>
                        Linear
                    </option>
                    <option value="quadratic" selected={"quadratic" === dataSet}>
                        Quadratic
                    </option>
                    <option value="cubic" selected={"cubic" === dataSet}>
                        Cubic
                    </option>
                    <option value="quintic" selected={"quintic" === dataSet}>
                        Quintic
                    </option>
                </select>
            </form>
        );
    }
}

export default DataSetDropDown;
