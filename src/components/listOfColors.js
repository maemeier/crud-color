import React, { Component } from "react";
import ColorRow from "./ColorRow";
import AddColor from "./addColor";

import "../style.css";

// create data
const colorLists = [
  { id: 1, domainColor: "Stone Grey", rangeColor: "Dark Grey" },
  { id: 2, domainColor: "Midnight Blue", rangeColor: "Dark Blue" },
  { id: 3, domainColor: "Carribean Sea", rangeColor: "Turquoise" },
  { id: 4, domainColor: "Old Rose", rangeColor: "Light Pink" }
];

// check color function

class listOfColors extends Component {
  state = {
    colorLists: [],
    offendingRows: [],
    severity: ""
  };

  // store data in localStorage
  componentDidMount() {
    const colorListFromStorage = localStorage.getItem("colorLists");

    if (colorListFromStorage) {
      this.setState({
        colorLists: JSON.parse(colorListFromStorage)
      });
    } else {
      this.setState({
        colorLists
      });
      console.log(colorLists);
    }
  }
  componentWillMount() {
    const colorLists = this.state.colorLists;
  }

  componentDidUpdate() {
    localStorage.setItem("colorLists", JSON.stringify(this.state.colorLists));
  }

  handleAddColor = (domainColor, rangeColor) => {
    // turn to lowercase
    // test trim white space
    let domain = domainColor.trim().toLowerCase();
    let range = rangeColor.trim().toLowerCase();

    //check if user add domain or range color

    if (!(domainColor.length > 1 && rangeColor.length > 1)) {
      alert("Domain and range cannot be empty 😊");
    } else if (this.isDuplicate(domain, range)) {
      alert(
        "Duplicate:Both domain and range color entered are already added before"
      );
    } else if (this.isFork(domain)) {
      alert(
        "Fork: The domain color entered are already in use with another range color "
      );
    } else if (this.isCycle(domain, range)) {
      alert(
        "Cycle: Both domain and range color entered are already in use as a mapped pair combination"
      );
    } else if (this.isChain(domain)) {
      alert("Chain:The domain color entered is already in use as range color");
    }
    this.setState({
      colorLists: [
        ...this.state.colorLists,
        {
          domainColor,
          rangeColor
        }
      ]
    });
  };

  highlightOffendingRows(rows, severity = "LOW") {
    this.setState({
      offendingRows: rows,
      severity
    });
  }

  // function and hightlight passed
  isDuplicate(domainColor, rangeColor) {
    const { colorLists } = this.state;
    const offendingRows = [];

    let result = colorLists.filter((colorList, idx) => {
      if (
        colorList.domainColor.toLowerCase() === domainColor &&
        colorList.rangeColor.toLowerCase() === rangeColor
      ) {
        offendingRows.push(idx);
        return true;
      }
      return false;
    });
    this.highlightOffendingRows(offendingRows, "LOW");
    return result.length >= 1 ? true : false;
  }

  // function and hightlight passed
  isFork(domainColor) {
    const { colorLists } = this.state;
    const offendingRows = [];

    let result = colorLists.filter((colorList, idx) => {
      if (colorList.domainColor.toLowerCase() === domainColor) {
        offendingRows.push(idx);
        return true;
      }
      return false;
    });
    this.highlightOffendingRows(offendingRows, "LOW");
    return result.length >= 1 ? true : false;
  }

  // function and hightlight passed
  isCycle(domainColor, rangeColor) {
    const { colorLists } = this.state;
    const offendingRows = [];

    let result = colorLists.filter((colorList, idx) => {
      if (
        colorList.domainColor.toLowerCase() === rangeColor &&
        colorList.rangeColor.toLowerCase() === domainColor
      ) {
        offendingRows.push(idx);
        return true;
      }
      return false;
    });
    this.highlightOffendingRows(offendingRows, "HIGH");
    return result.length >= 1 ? true : false;
  }

  // function and hightlight passed
  isChain(domainColor) {
    const { colorLists } = this.state;
    const offendingRows = [];
    let result = colorLists.filter((colorList, idx) => {
      if (colorList.rangeColor.toLowerCase() === domainColor) {
        offendingRows.push(idx);
        return true;
      }
      return false;
    });

    this.highlightOffendingRows(offendingRows, "LOW");
    return result.length >= 1 ? true : false;
  }

  handleEditSubmit = (domainColor, rangeColor, originalName) => {
    const { colorLists } = this.state;
    const updatedColors = colorLists.map(colorList => {
      if (colorList.domainColor === originalName) {
        colorList.domainColor = domainColor;
        colorList.rangeColor = rangeColor;
      }
      return colorList;
    });
    console.log(updatedColors);

    this.setState({ colorLists: updatedColors });
  };

  handleDeleteColor = domainColor => {
    const deleteColor = this.state.colorLists.filter(colorList => {
      return colorList.domainColor !== domainColor;
    });
    this.setState({ colorLists: deleteColor });
  };

  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="container">
            <AddColor handleAddColor={this.handleAddColor} />
            <div className="displayBox">
              <table>
                <thead>
                  <th className="headerName">Domain Color</th>
                  <th className="headerName">Range Color</th>

                  <th className="headerName">Edit</th>
                  <th className="headerName">Delete</th>
                </thead>

                {this.state.colorLists.map((colorList, rowIdx) => {
                  return (
                    <ColorRow
                      key={colorList.domainColor}
                      domainColor={colorList.domainColor}
                      rangeColor={colorList.rangeColor}
                      colorLists={colorLists}
                      handleDeleteColor={this.handleDeleteColor}
                      handleEditSubmit={this.handleEditSubmit}
                      isOffendingRow={this.state.offendingRows.includes(rowIdx)}
                      severity={this.state.severity}
                    />
                  );
                })}
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default listOfColors;
