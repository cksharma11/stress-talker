import React, { useState } from 'react';

const NoteForm = ({ onAddNote, onCancel }) => {
  const [title, setTitle] = useState('');
  const [emoji, setEmoji] = useState('😔');
  const [notes, setNotes] = useState('');

  // Combine all emojis into a single array
  const allEmojis = [
    '😔', '😢', '😤', '😰', '😨', '😭', '😞', '😟', '😕', '🙁',
    '😣', '😖', '😫', '😩', '😪', '😴', '😵', '😵‍💫', '🥺', '😶',
    '😊', '😃', '😍', '🥰', '😎', '🤩', '😇', '😁', '😌', '😺'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && notes.trim()) {
      onAddNote({
        title: title.trim(),
        emoji,
        notes: notes.trim()
      });
    }
  };

  return (
    <div className="note-form-container">
      <form className="note-form" onSubmit={handleSubmit}>
        <h2>How are you feeling today?</h2>
        
        <div className="form-group">
          <label htmlFor="title">Give this feeling a name</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your feeling a title..."
            required
          />
        </div>

        <div className="form-group">
          <label>How are you feeling?</label>
          <div className="emoji-selector">
            {allEmojis.map((emojiOption) => (
              <button
                key={emojiOption}
                type="button"
                className={`emoji-option ${emoji === emojiOption ? 'selected' : ''}`}
                onClick={() => setEmoji(emojiOption)}
              >
                {emojiOption}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="notes">Tell me more...</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Describe what's on your mind, what's causing stress, or how you're feeling..."
            rows="6"
            required
          />
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="save-btn">
            Save Note
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteForm; 