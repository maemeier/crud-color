import React, { Component } from "react";
import ListOfColor from "./listOfColor";
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
    let domain = domainColor.toLowerCase();
    let range = rangeColor.toLowerCase();

    //check if user add domain or range color

    if (!(domainColor.length > 1 && rangeColor.length > 1)) {
      alert("Domain and range cannot be empty 😊");
    } else if (this.isDuplicate(domain, range)) {
      alert("Both domain and range color entered are already added before");
    } else if (this.isFork(domain)) {
      alert(
        "The domain color entered are already in use with another range color "
      );
    } else if (this.isCycle(domain, range)) {
      alert(
        "Both domain and range color entered are already in use as a mapped pair combination"
      );
    } else if (this.isChain(domain)) {
      alert("The domain color entered is already in use as range color");
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
    let result = colorLists.filter(
      colorList =>
        colorList.domainColor.toLowerCase() === domainColor &&
        colorList.rangeColor.toLowerCase() === rangeColor
    );

    return result.length >= 1 ? true : false;
  }

  isFork(domainColor) {
    const { colorLists } = this.state;
    let result = colorLists.filter(
      elcolorList => elcolorList.domainColor.toLowerCase() === domainColor
    );
    return result.length >= 1 ? true : false;
  }

  isCycle(domainColor, rangeColor) {
    const { colorLists } = this.state;
    let result = colorLists.filter(
      elcolorList =>
        elcolorList.domainColor.toLowerCase() === rangeColor &&
        elcolorList.rangeColor.toLowerCase() === domainColor
    );
    return result.length >= 1 ? true : false;
  }

  //chain works sometime why??????
  isChain(domainColor) {
    const { colorLists } = this.state;
    let result = colorLists.filter(
      colorList => colorList.rangeColor.toLowerCase() === domainColor
    );
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

                {this.state.colorLists.map(colorList => {
                  return (
                    <tr>
                      <ListOfColor
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
export default listOfColors;
