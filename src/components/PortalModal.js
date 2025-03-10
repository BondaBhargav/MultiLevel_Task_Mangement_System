import React from "react";
import ReactDOM from "react-dom";

const PortalModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5">Add New Todo</h1>
          <button onClick={onClose} className="btn-close"></button>
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          <button onClick={onClose} className="btn btn-secondary">
            Close
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root") // The portal target
  );
};

export default PortalModal;
