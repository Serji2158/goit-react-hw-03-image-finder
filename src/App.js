import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import ImageGallery from "./Components/imageGallery/ImageGallery";
import SearchBar from "./Components/searchBar/SearchBar";

class App extends Component {
  state = {
    query: "",
  };

  handleFormSubmit = (query) => {
    this.setState({ query });
  };

  render() {
    return (
      <>
        <SearchBar onSubmit={this.handleFormSubmit} />
        <ImageGallery query={this.state.query} />
        <ToastContainer autoClose={3000} />
      </>
    );
  }
}

export default App;
