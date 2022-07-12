import { Component } from 'react';
import { Overlay, ModalForImg } from './Modal.styled';
import { createPortal } from 'react-dom';

const ModalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount = () => {
    window.addEventListener('keydown', this.hendleKeydouwn);
  };
  componentWillUnmount = () => {
    window.removeEventListener('keydown', this.hendleKeydouwn);
  };

  hendleKeydouwn = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  render() {
    return createPortal(
      <Overlay className="overlay">
        <ModalForImg className="modal">{this.props.children}</ModalForImg>
      </Overlay>,
      ModalRoot
    );
  }
}
