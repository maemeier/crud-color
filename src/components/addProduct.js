import React, { Component } from "react";
import "../style.css";

class addProduct extends Component {
  onSubmit = event => {
    event.preventDefault();
    this.props.handleAddColor(this.nameInput.value, this.colorInput.value);
    this.nameInput.value = " ";
    this.colorInput.value = " ";
  };
  render() {
    return (
      <div>
        <div className="inputBox">
          <form onSubmit={this.onSubmit}>
            <p>Add new color</p>
            <div className="form">
              <strong>Domain:</strong>
              <input
                className="addProduct"
                type="text"
                placeholder="type here"
                autoFocus
                required
                ref={nameInput => (this.nameInput = nameInput)}
              />
            </div>
            <div className="form">
              <strong>Range:</strong>
              <input
                className="addProduct"
                type="text"
                placeholder="type here"
                required
                ref={colorInput => (this.colorInput = colorInput)}
              />
            </div>

            <button className="submitButton">Add</button>
          </form>
        </div>
      </div>
    );
  }
}

export default addProduct;
