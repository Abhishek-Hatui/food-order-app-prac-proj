import classes from './Modal.module.css';
import { Fragment } from 'react';
import { createPortal } from 'react-dom';

const Backdrop = (props) => <div className={classes.backdrop} />;

const ModalOverLay = (props) => (
  <div className={classes.modal}>
    <div className={classes.content}>{props.children}</div>
  </div>
);

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
  return (
    <Fragment>
      {createPortal(<Backdrop />, portalElement)}
      {createPortal(
        <ModalOverLay>{props.children}</ModalOverLay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
