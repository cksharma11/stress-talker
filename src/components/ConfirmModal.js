import React, { useEffect, useRef } from 'react';

const ConfirmModal = ({ isOpen, title = 'Delete Note?', message = 'Are you sure you want to delete this note? This action cannot be undone.', onCancel, onConfirm }) => {
  const cancelRef = useRef();

  useEffect(() => {
    if (isOpen && cancelRef.current) {
      cancelRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" tabIndex={-1}>
      <div className="modal-content" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <h3 id="modal-title" style={{ marginBottom: 12, fontWeight: 600 }}>{title}</h3>
        <p style={{ marginBottom: 28, color: 'var(--text-secondary)' }}>{message}</p>
        <div className="modal-actions">
          <button
            ref={cancelRef}
            className="modal-btn cancel"
            onClick={onCancel}
            style={{ marginRight: 16 }}
          >
            Cancel
          </button>
          <button
            className="modal-btn delete"
            onClick={onConfirm}
            style={{ background: 'var(--danger)', color: '#fff' }}
          >
            Delete
          </button>
        </div>
      </div>
      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.32);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .modal-content {
          background: var(--background);
          border-radius: 18px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.18);
          padding: 36px 32px 28px 32px;
          min-width: 320px;
          max-width: 90vw;
          text-align: center;
        }
        .modal-actions {
          display: flex;
          justify-content: center;
        }
        .modal-btn {
          font-size: 1rem;
          padding: 10px 28px;
          border-radius: 999px;
          border: none;
          cursor: pointer;
          background: var(--button-bg, #f2f2f2);
          color: var(--text-primary);
          transition: background 0.2s;
        }
        .modal-btn.cancel:hover {
          background: #e0e0e0;
        }
        .modal-btn.delete {
          background: #e57373;
        }
        .modal-btn.delete:hover {
          background: #d32f2f;
        }
      `}</style>
    </div>
  );
};

export default ConfirmModal; 