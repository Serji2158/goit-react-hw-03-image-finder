import React, { Component } from "react";
import ImageGalleryItem from "../imageGalleryItem/ImageGalleryItem";
import api from "./../../service/API";
import s from "./ImageGallery.module.css";

class ImageGallery extends Component {
  state = {
    gallery: [],
    loading: false,
    error: null,
    isHidden: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query;
    const nextQuery = this.props.query;
    if (prevQuery !== nextQuery || this.props.page !== prevProps.page) {
      this.setState({ loading: true });
      this.updateGallery();
    }

    if (this.state.gallery !== prevState.gallery && this.props.page !== 1) {
      this.scroll();
    }
  }

  updateGallery = () => {
    api
      .fetchGallery(this.props.query, this.props.page)
      .then(({ hits }) => {
        this.setState((prevState) => ({
          gallery:
            this.props.page === 1 ? [...hits] : [...prevState.gallery, ...hits],
          isHidden: true,
        }));
      })
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  };

  scroll = () => {
    const element = document.body;
    element.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  render() {
    const { gallery, loading, error } = this.state;
    const { query } = this.props;
    return (
      <>
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {loading && <p>Loading...</p>}
        {!query && <div className={s.infoBox}>Enter you request</div>}
        {gallery.length > 0 && (
          <ul className={s.ImageGallery}>
            <ImageGalleryItem gallery={this.state.gallery} />
          </ul>
        )}
        {this.state.isHidden && (
          <button
            type="button"
            className={s.Button}
            onClick={this.props.increasePage}
          >
            LOAD MORE
          </button>
        )}
      </>
    );
  }
}

export default ImageGallery;
