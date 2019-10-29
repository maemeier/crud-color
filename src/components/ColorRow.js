import React, { Component } from "react";
import "../style.css";

class ColorRow extends Component {
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

  handleCancleColor = () => {
    this.setState({ isUpdated: false });
  };

  handleEditSubmit = (
    handleEditSubmit,
    domainColor,
    rangeColor,
    originalName
  ) => {
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

    //  add conditions (now alert work!)
    if (!(domainColor.length > 1 && rangeColor.length > 1)) {
      alert("Domain and range cannot be empty 😊");
    } else if (this.isDuplicate(domain, range, editColors)) {
      //fixd save
      alert(
        "Duplicate:Both domain and range color entered are already added before"
      );
    } else if (this.isFork(domain, editColors)) {
      alert(
        "Fork:The domain color entered are already in use with another range color "
      );
    } else if (this.isCycle(domain, range, editColors)) {
      alert(
        "Cycle:Both domain and range color entered are already in use as a mapped pair combination"
      );
    } else if (this.isChain(domain, editColors)) {
      alert("Chain:The domain color entered is already in use as range color");
    } else {
      this.props.handleEditSubmit(
        domainColor.trim(),
        rangeColor.trim(),
        this.props.domainColor
      );
      this.setState({ isUpdated: false });
    }
  };

  getBgColorBasedOnSeverity() {
    if (this.props.severity === "HIGH") {
      return "#ff4040";
    } else if (this.props.severity === "MEDIUM") {
      return "#FF7F50";
    }
    return "#fada5e";
  }

  render() {
    const { domainColor, rangeColor, isOffendingRow } = this.props;
    return (
      <tr
        style={
          isOffendingRow
            ? {
                background: this.getBgColorBasedOnSeverity(),
                color: "white",
                fontWeight: "bold"
              }
            : {}
        }
      >
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
                save
              </button>
            </td>
            <td>
              <button className="cancleButton" onClick={this.handleCancleColor}>
                cancle
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
      </tr>
    );
  }
}
export default ColorRow;
