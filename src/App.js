import React, { Component } from "react";
import ColorLists from "./components/colorLists";
import Header from "./components/header";
import "./style.css";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <ColorLists />
      </div>
    );
  }
}
export default App;
