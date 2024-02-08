import React from 'react';
import "./css/logout.css";
import { createPortal } from 'react-dom';

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return createPortal(
    <>
    <div className="modal-window">
      <div class="modal-content">
        <p>Are you sure you want to logout?</p>
        <button class="yes" onClick={onConfirm}>Yes</button>
        <button class="no" onClick={onClose}>No</button>
      </div>
    </div>
    </>, document.getElementById("portal")
  );
};

export default LogoutModal;