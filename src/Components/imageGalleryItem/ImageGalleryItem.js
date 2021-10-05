import React, { Component } from "react";
import Modal from "../modal/Modal";
import s from "../imageGalleryItem/ImageGalleryItem.module.css";

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
    largeImage: "",
  };

  toggleModal = (e) => {
    this.setState((prev) => ({
      showModal: !prev.showModal,
      largeImage: e.target.id || "",
    }));
  };

  render() {
    return (
      <>
        {this.props.gallery.map((picture) => (
          <li
            className={s.ImageGalleryItem}
            key={picture.id}
            onClick={this.toggleModal}
          >
            <img
              className={s.ImageGalleryItemImage}
              src={picture.webformatURL}
              alt=""
              id={picture.largeImageURL}
            />
          </li>
        ))}
        {/* console.log(picture) */}
        {this.state.showModal && (
          <Modal onClose={this.toggleModal} children={this.state.largeImage} />
        )}
      </>
    );
  }
}

export default ImageGalleryItem;
