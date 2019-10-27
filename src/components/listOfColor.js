import React, { Component } from "react";
import "../style.css";

class ListOfColor extends Component {
  state = {
    isUpdated: false,
    colorLists: this.props.colorLists,
    domainColor: this.props.domainColor,
    rangeColor: this.props.rangeColor
  };

  handleDeleteColor = () => {
    const { handleDeleteColor, domainColor } = this.props;
    handleDeleteColor(domainColor);
  };

  handleUpdateColor = () => {
    this.setState({ isUpdated: true });
  };

  handleEditSubmit = (
    handleEditSubmit,
    domainColor,
    rangeColor,
    originalName
  ) => {
    const { colorLists } = this.state;

    this.setState({ isUpdated: true });
  };

  handleInputChange = (domainColor, value) => {
    this.setState({ [domainColor]: value });
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
      colorList => colorList.domainColor.toLowerCase() === domainColor
    );
    return result.length >= 1 ? true : false;
  }

  isCycle(domainColor, rangeColor) {
    const { colorLists } = this.state;
    let result = colorLists.filter(
      colorList =>
        colorList.domainColor.toLowerCase() === rangeColor &&
        colorList.rangeColor.toLowerCase() === domainColor
    );
    return result.length >= 1 ? true : false;
  }

  isChain(domainColor) {
    const { colorLists } = this.state;
    let result = colorLists.filter(
      colorList => colorList.rangeColor.toLowerCase() === domainColor
    );
    return result.length >= 1 ? true : false;
  }

  handleEditSave = () => {
    let { domainColor, rangeColor } = this.state;
    // white space and lowercase
    // add conditions before save

    let domain = domainColor.trim().toLowerCase();
    let range = rangeColor.trim().toLowerCase();
    // import data
    let colorLists = JSON.parse(localStorage.getItem("colorLists"));
    // check if edit colors match the color in data
    let editColors = colorLists.filter(
      colorList =>
        colorList.domainColor !== this.props.domainColor &&
        colorList.rangeColor !== this.props.rangeColor
    );

    //  add conditions (alert doesn't work!)
    if (!(domainColor.length > 1 && rangeColor.length > 1)) {
      alert("Domain and range color cannot be emtpy");
    } else {
      this.props.handleEditSubmit(domainColor, rangeColor, domainColor);
      this.setState({ isUpdated: false });
    }
  };
  render() {
    const { domainColor, rangeColor } = this.props;
    return (
      <React.Fragment>
        {this.state.isUpdated ? (
          <React.Fragment>
            <td>
              <input
                className="editData"
                type="text"
                placeholder="change name"
                defaultValue={domainColor}
                value={this.state.domainColor}
                required
                onChange={e =>
                  this.handleInputChange("domainColor", e.target.value)
                }
              />
            </td>
            <td>
              <input
                className="editData"
                type="text"
                placeholder="change color"
                defaultValue={rangeColor}
                required
                value={this.state.rangeColor}
                onChange={e =>
                  this.handleInputChange("rangeColor", e.target.value)
                }
              />
            </td>

            <td>
              <button className="updateButton" onClick={this.handleEditSave}>
                Save
              </button>
            </td>
            <td></td>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {" "}
            <td> {domainColor}</td>
            <td>{rangeColor}</td>
            <td>
              <button className="editButton" onClick={this.handleEditSubmit}>
                edit
              </button>
            </td>
            <td>
              {" "}
              <button className="deleteButton" onClick={this.handleDeleteColor}>
                delete
              </button>
            </td>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
export default ListOfColor;
