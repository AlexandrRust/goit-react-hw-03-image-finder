import { Component } from 'react';
import { Overlay, Modal } from './Modal.styled';
import { createPortal } from 'react-dom';

const ModalRoot = document.querySelector('#modal-root');

export class ModalImg extends Component {
  componentDidMount = () => {
    window.addEventListener('keydown', this.HendleKeydouwn);
  };
  componentWillUnmount = () => {
    window.removeEventListener('keydown', this.HendleKeydouwn);
  };

  HendleKeydouwn = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  render() {
    return createPortal(
      <Overlay className="overlay">
        <Modal className="modal">{this.props.children}</Modal>
      </Overlay>,
      ModalRoot
    );
  }
}
