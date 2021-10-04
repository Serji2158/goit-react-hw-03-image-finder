import React, { Component } from "react";

class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleEsc);
    const body = document.querySelector("body");
    body.style.overflow = "hidden";
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleEsc);
    const body = document.querySelector("body");
    body.style.overflow = "auto";
  }

  handleEsc = (e) => {
    if (e.code === "Escape") {
      this.props.hideModal();
    }
  };
  onHandleClick = () => {
    this.props.hideModal();
  };
  handleBackdropClick = (e) => {
    if (e.target !== e.currentTarget) return;
    this.props.hideModal();
  };

  render() {
    return (
      <ModalContainer onClick={this.handleBackdropClick}>
        <div className='modal'>{this.props.children}</div>
      </ModalContainer>

          <div className="Overlay">
      <div className="Modal">
        <img src="" alt="" />
      </div>
    </div>
    );
  }
}

export default Modal;
