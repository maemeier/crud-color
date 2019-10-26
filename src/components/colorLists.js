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
    // this.setState({ colorList });
  }

  componentDidUpdate() {
    localStorage.setItem("colorLists", JSON.stringify(this.state.colorLists));
  }

  handleAddColor = (domainColor, rangeColor) => {
    const { colorLists } = this.state;

    // check if name is color already used
    let nameIsAvailable = false;
    colorLists.forEach(x => {
      if (x.domainColor === domainColor) nameIsAvailable = true;
      // Error Duplicate "This domain color is already added"
      if (x.domainColor === rangeColor) nameIsAvailable = true;
      // Error Fork "This domain color is already mactched with another range color"
      if (x.rangeColor === domainColor) nameIsAvailable = true;
      // Error Cycle ""
      // Error Chain "This range color can't be used as domain color"
    });

    if (!nameIsAvailable) {
      this.setState({
        colorLists: [
          ...this.state.colorLists,
          {
            domainColor,
            rangeColor
          }
        ]
      });
    } else {
      alert("The domain or range is already added 😊");
    }
  };

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
