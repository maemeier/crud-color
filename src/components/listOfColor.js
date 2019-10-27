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

    // move all conditions here
    let nameIsAvailable = false;
    colorLists.forEach(x => {
      if (x.domainColor === domainColor) nameIsAvailable = true;
      if (x.domainColor === rangeColor) nameIsAvailable = true;
      if (x.rangeColor === domainColor) nameIsAvailable = true;
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

    this.setState({ isUpdated: true });
  };

  handleInputChange = (domainColor, value) => {
    this.setState({ [domainColor]: value });
  };

  handleEditSave = () => {
    this.props.handleEditSubmit(
      this.state.domainColor,
      this.state.rangeColor,
      this.props.domainColor
    );
    this.setState({ isUpdated: false });
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
