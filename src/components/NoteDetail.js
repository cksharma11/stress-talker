import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ConfirmModal from './ConfirmModal';

const NoteDetail = ({ notes, setNotes }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const note = notes.find(n => String(n.id) === id);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    setNotes(prev => prev.filter(n => String(n.id) !== id));
    setShowConfirm(false);
    navigate('/');
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
  };

  if (!note) {
    return (
      <div className="note-detail-content" style={{ margin: '60px auto', textAlign: 'center' }}>
        <button className="close-btn" onClick={() => navigate('/')}>Back</button>
        <h2>Note not found</h2>
      </div>
    );
  }

  return (
    <div className="note-detail-content" style={{ margin: '60px auto', textAlign: 'center', position: 'relative' }}>
      <button className="close-btn" onClick={() => navigate('/')}>&larr; Back</button>
      <button
        className="delete-btn delete-btn-detail"
        onClick={handleDelete}
        title="Delete note"
        style={{
          position: 'absolute',
          top: 12,
          right: 12,
          width: 38,
          height: 38,
          borderRadius: '50%',
          background: '#f8fafc',
          color: '#f87171',
          border: 'none',
          fontSize: '1.3rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 1px 4px rgba(102, 126, 234, 0.04)',
          zIndex: 10,
          cursor: 'pointer',
        }}
        aria-label="Delete note"
      >
        🗑️
      </button>
      <div className="note-detail-emoji" style={{ marginTop: 24 }}>{note.emoji}</div>
      <h2 className="note-detail-title">{note.title}</h2>
      <div className="note-detail-date">{new Date(note.createdAt).toLocaleString()}</div>
      <div className="note-detail-notes" style={{ whiteSpace: 'pre-line' }}>{note.notes}</div>
      <ConfirmModal
        isOpen={showConfirm}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default NoteDetail; 