import React, { Component } from "react";
import ImageGalleryItem from "../imageGalleryItem/ImageGalleryItem";
import api from "./../../service/API";
console.log(api);

class ImageGallery extends Component {
  state = {
    gallery: [],
    loadimg: false,
    error: null,
  };

  componentDidMount() {
    api.fetchPokemon(this.props.query);
    // function fetchPokemon(query) {
    //   return fetch(
    //     `https://pixabay.com/api/?q=${query}=1&key={23675334-f5a1abcfe20e79567add0d4e1}&image_type=photo&orientation=horizontal&per_page=12`
    //   ).then((response) => {
    //     if (response.ok) {
    //       return response.json();
    //     }
    //     return Promise.reject(new Error(`Нет картинки с именем ${query}`));
    //   });
    // }
  }

  async componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.query;
    const nextName = this.props.query;
    if (prevName !== nextName) {
      this.setState({ loading: true });

      api
        .fetchPokemon(this.props.query)
        // .then((resp) => console.log("resp", resp));
        .then((response) => this.setState({ gallery: response.data.hits }))
        // .catch((error) => this.setState({ error }))
        .finaly(() => this.setState({ loading: false }));
    }
  }

  render() {
    const { gallery, loading, error } = this.state;
    const { query } = this.props;
    return (
      <>
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {loading && <p>Loading...</p>}
        {!query && <div>Enter you request</div>}
        {gallery.length > 0 && (
          <ul className="ImageGallery">
            {gallery.map((item) => (
              <ImageGalleryItem pokemon={item} key={item.id} />
            ))}
          </ul>
        )}
      </>
    );
  }
}

export default ImageGallery;
