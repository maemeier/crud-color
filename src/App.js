import React, { Component } from "react";
import ColorLists from "./components/colorLists";
import Footer from "./components/footer";
import "./style.css";

class App extends Component {
  render() {
    return (
      <div>
        <ColorLists />
        <Footer />
      </div>
    );
  }
}
export default App;
