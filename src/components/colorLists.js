import React, { Component } from "react";
import ProductItem from "./productItem";
import Addproduct from "./addProduct";

import "../style.css";

// create data
const colorLists = [
  { id: 1, domainColor: "Stone Grey", rangeColor: "Dark Grey" },
  { id: 2, domainColor: "Midnight Blue", rangeColor: "Dark Blue" },
  { id: 3, domainColor: "Carribean Sea", rangeColor: "Turquoise" },
  { id: 4, domainColor: "Old Rose", rangeColor: "Light Pink" }
];

// check color function

class App extends Component {
  state = {
    colorLists: []
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
    }
  }
  componentWillMount() {
    const colorLists = this.state.colorLists;
  }

  componentDidUpdate() {
    localStorage.setItem("colorLists", JSON.stringify(this.state.colorLists));
  }

  handleAddColor = (domainColor, rangeColor) => {
    //check if user add domain or range color
    if (!(domainColor.length > 1 && rangeColor.length > 1)) {
      alert("Please add domain color && range color 😊");
    } else if (this.isCycle(domainColor, rangeColor)) {
      alert("cycle");
    } else if (this.isDuplicate(domainColor, rangeColor)) {
      alert("duplicate");
    } else if (this.isChain(rangeColor)) {
      alert("chain");
    } else if (this.isFork(domainColor)) {
      alert("fork");
    } else {
      this.setState({
        colorLists: [
          ...this.state.colorLists,
          {
            domainColor,
            rangeColor
          }
        ]
      });
    }
  };

  isDuplicate(domainColor, rangeColor) {
    const { colorLists } = this.state;
    let checkDuplicate = colorLists.filter(
      colorList =>
        colorList.domainColor === domainColor &&
        colorList.rangeColor === rangeColor
    );
    return checkDuplicate;
  }

  isCycle(domainColor, rangeColor) {
    const { colorLists } = this.state;
    let checkCycle = colorLists.filter(
      colorList =>
        colorList.domainColor === rangeColor &&
        colorList.rangeColor === domainColor
    );
    return checkCycle;
  }

  isChain(domainColor) {
    const { colorLists } = this.state;
    let checkChain = colorLists.filter(
      colorList => colorList.rangeColor === domainColor
    );
    return checkChain;
  }

  isFork(domainColor) {
    const { colorLists } = this.state;
    let checkFork = colorLists.filter(
      colorList => colorList.domainColor === domainColor
    );
    return checkFork;
  }

  handleEditSubmit = (domainColor, rangeColor, originalName) => {
    const { colorLists } = this.state;
    const updatedProducts = colorLists.map(colorList => {
      if (colorList.domainColor === originalName) {
        colorList.domainColor = domainColor;
        colorList.rangeColor = rangeColor;
      }
      return colorList;
    });
    console.log(updatedProducts);

    this.setState({ colorLists: updatedProducts });
  };

  handleDeleteColor = domainColor => {
    const deleteProduct = this.state.colorLists.filter(colorList => {
      return colorList.domainColor !== domainColor;
    });
    this.setState({ colorLists: deleteProduct });
  };

  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="container">
            <Addproduct handleAddColor={this.handleAddColor} />
            <div className="displayBox">
              <table>
                <thead>
                  <th className="headerName">Domain Color</th>
                  <th className="headerName">Range Color</th>

                  <th className="headerName">Edit</th>
                  <th className="headerName">Delete</th>
                </thead>

                {this.state.colorLists.map(colorList => {
                  return (
                    <tr>
                      <ProductItem
                        key={colorList.domainColor}
                        domainColor={colorList.domainColor}
                        rangeColor={colorList.rangeColor}
                        colorLists={colorLists}
                        handleDeleteColor={this.handleDeleteColor}
                        handleEditSubmit={this.handleEditSubmit}
                      />
                    </tr>
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
export default App;
