import React, { Component } from "react";
import ListOfColors from "./components/listOfColors";
import Header from "./components/header";
import "./style.css";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <ListOfColors />
      </div>
    );
  }
}
export default App;
