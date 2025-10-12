import React, { useState, useRef, useEffect } from "react";
import "./modal.css";

export const Modal = (props) => {
  const {
    isOpen: externalIsOpen,
    requireCloseButton = true,
    onClose,
    title,
    body,
    footer,
    requireLaunchButton = false,
    launchButtonLabel = "Open Modal",
  } = props;

  const [internalOpen, setInternalOpen] = useState(false);
  const modalRef = useRef(null);
  const isControlled = !requireLaunchButton;
  const isModalOpen = isControlled ? externalIsOpen : internalOpen;

  const handleClose = () => {
    if (isControlled && requireCloseButton) {
      onClose?.(false);
    } else {
      setInternalOpen(false);
      if (typeof onClose === "function") onClose(false);
    }
  };

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      handleClose();
    }
  };

  if (isControlled) {
    if (requireCloseButton && typeof onClose !== "function") {
      throw new Error(
        "onClose must be a function when modal is externally controlled"
      );
    }
    if (typeof externalIsOpen !== "boolean") {
      throw new Error(
        "isOpen must be a boolean when modal is externally controlled"
      );
    }
  }

  if (typeof title !== "object") {
    throw new Error("title must be JSX");
  }
  if (typeof body !== "object") {
    throw new Error("body must be JSX");
  }
  if (footer && typeof footer !== "object") {
    throw new Error("footer must be JSX");
  }

  useEffect(() => {
    if (externalIsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [externalIsOpen]);

  return (
    <React.Fragment>
      {requireLaunchButton && (
        <button
          onClick={() => setInternalOpen(true)}
          className="modal-launch-btn"
        >
          {launchButtonLabel}
        </button>
      )}

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container" ref={modalRef}>
            <div className="modal-title">
              <div className="modal-title-content">{title}</div>
              {requireCloseButton && (
                <button className="modal-close" onClick={handleClose}>
                  Close
                </button>
              )}
            </div>
            <div className="modal-body">{body}</div>
            {footer && <div className="modal-footer">{footer}</div>}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
