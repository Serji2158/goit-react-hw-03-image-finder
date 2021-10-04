import React, { Component } from "react";
// import { ImSearch } from "react-icons/im";
import { toast } from "react-toastify";

class SearchBar extends Component {
  state = {
    query: "",
  };
  handleQueryChange = (event) => {
    this.setState({ query: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.query.trim() === "") {
      toast.error("Enter your request.");
      return;
    }

    this.props.onSubmit(this.state.query);
    this.setState({ query: "" });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
            onChange={this.handleQueryChange}
            value={this.state.query}
          />
        </form>
      </header>
    );
  }
}

export default SearchBar;
