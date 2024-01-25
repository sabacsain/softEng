import React from 'react';
import "./css/logout.css";

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-window">
      <div class="modal-content">
        <p>Are you sure you want to logout?</p>
        <button class="yes" onClick={onConfirm}>Yes</button>
        <button class="no" onClick={onClose}>No</button>
      </div>
    </div>
  );
};

export default LogoutModal;