import React, { useEffect, useRef } from 'react';
import './Modal.css';

function Modal({ isOpen, onClose, title, children }) {
  const modalRef = useRef(null);
  const agreeButtonRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isOpen) {
        e.preventDefault();
        e.stopPropagation();
        if (e.key === 'Enter' && agreeButtonRef.current) {
          agreeButtonRef.current.click();
        }
      }
    };

    const handleFocus = (e) => {
      if (isOpen && !modalRef.current.contains(e.target)) {
        e.preventDefault();
        agreeButtonRef.current.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown, true);
    document.addEventListener('focus', handleFocus, true);
    document.body.style.overflow = isOpen ? 'hidden' : 'visible';

    if (isOpen && agreeButtonRef.current) {
      agreeButtonRef.current.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
      document.removeEventListener('focus', handleFocus, true);
      document.body.style.overflow = 'visible';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} aria-modal="true" role="dialog">
      <div className="modal" onClick={(e) => e.stopPropagation()} ref={modalRef}>
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
        </div>
        <div className="modal-content">
          {children}
        </div>
        <div className="modal-footer">
       
        </div>
      </div>
    </div>
  );
}

export default Modal;