import React, { useState, useEffect } from 'react';
import './App.css';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import NoteDetail from './components/NoteDetail';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

const THEMES = [
  { value: 'theme-calm-blue', label: 'Calm Blue' },
  { value: 'theme-soft-green', label: 'Soft Green' },
  { value: 'theme-warm-peach', label: 'Warm Peach' },
  { value: 'theme-gentle-purple', label: 'Gentle Purple' },
  { value: 'theme-classic-light', label: 'Classic Light' },
];

function NewNotePage({ onAddNote }) {
  const navigate = useNavigate();
  return (
    <NoteForm
      onAddNote={note => {
        onAddNote(note);
        navigate('/');
      }}
      onCancel={() => navigate('/')}
    />
  );
}

function AppContent() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'theme-calm-blue');

  // Enhanced localStorage utilities
  const storageKey = 'stressTalkerNotes';
  
  const saveToStorage = (data) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(data));
      return true;
    } catch (error) {
      return false;
    }
  };

  const loadFromStorage = () => {
    try {
      const data = localStorage.getItem(storageKey);
      if (data) {
        return JSON.parse(data);
      }
      return [];
    } catch (error) {
      return [];
    }
  };

  // Test localStorage functionality
  const testLocalStorage = () => {
    try {
      const testKey = 'stressTalkerTest';
      const testValue = { test: true, timestamp: Date.now() };
      localStorage.setItem(testKey, JSON.stringify(testValue));
      const retrieved = JSON.parse(localStorage.getItem(testKey));
      localStorage.removeItem(testKey);
      return retrieved && retrieved.test === true;
    } catch (error) {
      return false;
    }
  };

  // Load notes from localStorage on component mount
  useEffect(() => {
    const localStorageWorks = testLocalStorage();
    if (localStorageWorks) {
      const savedNotes = loadFromStorage();
      setNotes(savedNotes);
    }
    setIsLoading(false);
  }, []);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    if (!isLoading && notes.length > 0) {
      saveToStorage(notes);
    }
  }, [notes, isLoading]);

  // Save theme to localStorage
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const addNote = (newNote) => {
    const noteWithId = {
      ...newNote,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    setNotes(prevNotes => [noteWithId, ...prevNotes]);
  };

  const deleteNote = (id) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
  };

  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className={`App ${theme}`}>
        <div className="navbar">
          <div className="navbar-content">
            <div className="navbar-logo">🌿 Stress Talker</div>
            <div className="theme-switcher">
              <select value={theme} onChange={e => setTheme(e.target.value)}>
                {THEMES.map(t => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="container">
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <h2>Loading...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`App ${theme}`}>
      <div className="navbar">
        <div className="navbar-content">
          <div
            className="navbar-logo"
            role="button"
            tabIndex={0}
            style={{ cursor: 'pointer', outline: 'none' }}
            onClick={() => navigate('/')}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') navigate('/'); }}
          >🌿 Stress Talker</div>
          <div className="theme-switcher">
            <select value={theme} onChange={e => setTheme(e.target.value)}>
              {THEMES.map(t => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="container">
        <header className="app-header">
          <h1>Your Safe Space</h1>
          <p className="subtitle">This is your private, judgment-free space. Write anything you feel—your thoughts are safe here and only visible to you.</p>
        </header>
        <main className="main-content">
          <Routes>
            <Route path="/" element={
              <>
                <div className="welcome-section">
                  <button 
                    className="add-note-btn"
                    onClick={() => navigate('/new')}
                  >
                    ✨ Add New Note
                  </button>
                </div>
                <NoteList 
                  notes={notes}
                  onDeleteNote={deleteNote}
                  onOpenNote={note => navigate(`/note/${note.id}`)}
                />
              </>
            } />
            <Route path="/new" element={<NewNotePage onAddNote={addNote} />} />
            <Route path="/note/:id" element={<NoteDetail notes={notes} setNotes={setNotes} />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
