import React from 'react';

export const Modal = ({ children }) => (
  <div
    style={{
      position: 'absolute',
      top: '310px',
      left: '80px',
      background: 'black',
      width: '700px',
      padding: '40px'
    }}>
    {children}
  </div>
);

export default Modal;
