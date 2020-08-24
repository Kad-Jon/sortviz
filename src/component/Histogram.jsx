import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./styles/Histogram.css";

class Histogram extends Component {
  render() {
    return (
      <ul className="Histogram container-fluid">
        {this.createBarList(this.props.array, this.props.colorArray)}
      </ul>
    );
  }

  createBarList = (array, colorArray) => {
    const width = 100 / array.length;
    const length = array.length;
    return array.map((element, index) => {
      return this.createBar(element / length, colorArray[index], width, index);
    });
  };

  createBar = (height, color, width, index) => {
    const styles = {
      height: height * 100 + "%",
      width: width + "%",
      backgroundColor: color,
    };

    return (
      <li>
        <Bar key={height + color + index + width} styles={styles}></Bar>
      </li>
    );
  };
}

class Bar extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.styles !== nextProps.styles) {
      return false;
    }
  }

  render() {
    return <div className="Bar" style={this.props.styles}></div>;
  }
}

export default Histogram;
