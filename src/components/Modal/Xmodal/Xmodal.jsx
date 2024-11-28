
import { useEffect, useRef } from 'react';

// eslint-disable-next-line react/prop-types
const Modal = ({ isOpen, onClose, children}) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('mousedown', handleClickOutside);
    } else {
      window.removeEventListener('mousedown', handleClickOutside);
    }

    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <div className={`modal-overlay ${isOpen ? 'modal-open' : 'modal-close'} z-50`}>
      <div className="modal-content" ref={modalRef}>
        <button onClick={onClose} className="modal-close-button">X</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;




