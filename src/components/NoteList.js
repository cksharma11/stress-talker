import React from 'react';

const NoteList = ({ notes, onOpenNote }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // Sort notes by createdAt descending (latest first)
  const sortedNotes = [...notes].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  if (notes.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📝</div>
        <h3>No notes yet</h3>
        <p>Start by adding your first note to track your feelings</p>
      </div>
    );
  }

  return (
    <div className="notes-section" style={{ width: '100%', maxWidth: '90vw', margin: '0 auto', marginTop: 32 }}>
      <h2 style={{ marginBottom: 24, marginLeft: 8, fontWeight: 600 }}>Your Notes ({notes.length})</h2>
      <div className="notes-list" style={{ width: '100%', maxWidth: '100%', borderRadius: 24, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
        {sortedNotes.map((note) => (
          <div
            key={note.id}
            className="note-row note-row-clickable"
            style={{ padding: '32px 40px', fontSize: '1.18rem', cursor: 'pointer', position: 'relative' }}
            onClick={() => onOpenNote(note)}
            tabIndex={0}
            role="button"
            aria-label={`Open note titled ${note.title}`}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onOpenNote(note); }}
          >
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <div className="note-emoji">{note.emoji}</div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 0 }}>
                <div className="note-title" style={{ flex: 1, textAlign: 'left' }}>{note.title}</div>
                <div className="note-date" style={{ textAlign: 'right', minWidth: 180 }}>{formatDate(note.createdAt)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoteList; 