import React, { useState } from 'react';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';

function App() {
    const [noteToEdit, setNoteToEdit] = useState(null);

    // Refresh notes after a create/update
    const handleSave = () => {
        setNoteToEdit(null); // Reset form after save
    };

    const handleEdit = (note) => {
        setNoteToEdit(note);
    };

    return (
        <div className="App">
            <h1>Notes App</h1>
            <NoteForm noteToEdit={noteToEdit} onSave={handleSave} />
            <NoteList onEdit={handleEdit} />
        </div>
    );
}

export default App;
