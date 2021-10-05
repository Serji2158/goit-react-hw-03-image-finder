import React, { Component } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.querySelector("#modal-root");

class Modal extends Component {
  state = {};

  componentDidMount() {
    window.addEventListener("keydown", this.handleEsc);
    // const body = document.querySelector("body");
    // body.style.overflow = "hidden";
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleEsc);
    // const body = document.querySelector("body");
    // body.style.overflow = "auto";
  }

  handleEsc = (e) => {
    if (e.code === "Escape") {
      this.props.hideModal(e);
    }
  };

  onHandleClick = (e) => {
    this.props.hideModal(e);
  };

  handleBackdropClick = (e) => {
    if (e.target !== e.currentTarget) return;
    this.props.hideModal(e);
  };

  render() {
    return createPortal(
      <div className="Overlay" onClick={this.handleBackdropClick}>
        <div className="Modal">
          <img src={this.props.children} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
