import React, { Component } from "react";
import ImageGalleryItem from "../imageGalleryItem/ImageGalleryItem";
import api from "./../../service/API";
import s from "./ImageGallery.module.css";

// console.log(api);

class ImageGallery extends Component {
  state = {
    gallery: [],
    loading: false,
    error: null,
    page: 1,
    isHidden: false,
  };

  componentDidMount() {
    api.fetchGallery(this.props.query);
    this.setState({ showLoader: true });
  }

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query;
    const nextQuery = this.props.query;
    if (prevQuery !== nextQuery) {
      this.setState({ loading: true });
      api
        .fetchGallery(nextQuery, this.state.page)
        // .then((resp) => console.log("resp", resp))
        .then(({ hits }) => {
          this.setState((prevState) => ({
            gallery: [...prevState.gallery, ...hits],
            page: prevState.page + 1,
            isHidden: true,
          }));
        })
        .catch((error) => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  onBtnClick = () => {
    api.fetchGallery(this.props.query, this.state.page).then(({ hits }) => {
      this.setState((prevState) => ({
        gallery: [...prevState.gallery, ...hits],
        page: prevState.page + 1,
        isHidden: true,
      }));
    });
    this.scroll();
  };

  scroll = () => {
    const element = document.body;
    setTimeout(() => {
      element.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }, 1000);
  };

  render() {
    const { gallery, loading, error } = this.state;
    const { query } = this.props;
    return (
      <>
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {loading && <p>Loading...</p>}
        {!query && <div>Enter you request</div>}
        {gallery.length > 0 && (
          <ul className={s.ImageGallery}>
            <ImageGalleryItem gallery={this.state.gallery} />
          </ul>
        )}
        {this.state.isHidden && (
          <button type="button" className="button" onClick={this.onBtnClick}>
            LOAD MORE
          </button>
        )}
      </>
    );
  }
}

export default ImageGallery;
