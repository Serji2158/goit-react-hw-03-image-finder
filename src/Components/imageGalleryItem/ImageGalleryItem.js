import React from "react";

const ImageGalleryItem = ({ item }) => {
  return (
    <li className="ImageGalleryItem" key={item.id}>
      <img
        src={item.webformatURL}
        alt=""
        className="ImageGalleryItem-image"
        data-src={item.largeImageURL}
      />
    </li>
  );
};

export default ImageGalleryItem;
