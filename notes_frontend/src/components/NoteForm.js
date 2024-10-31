import React, { useState } from 'react';
import axios from 'axios';

// NoteForm component definition
const NoteForm = ({ noteToEdit, onSave }) => {
    // State hooks for title and content, initialized based on noteToEdit prop
    const [title, setTitle] = useState(noteToEdit ? noteToEdit.title : "");
    const [content, setContent] = useState(noteToEdit ? noteToEdit.content : "");

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        const newNote = { id: noteToEdit ? noteToEdit.id : Date.now(), title, content }; // Create new note object
        
        // If editing an existing note, send PUT request
        if (noteToEdit) {
            axios.put(`http://127.0.0.1:8000/notes/${noteToEdit.id}`, newNote)
                .then(() => onSave()) // Call onSave callback on success
                .catch((error) => console.error(error)); // Log error on failure
        } else {
            // If creating a new note, send POST request
            axios.post("http://127.0.0.1:8000/notes", newNote)
                .then(() => onSave()) // Call onSave callback on success
                .catch((error) => console.error(error)); // Log error on failure
        }
    };

    return (
        // Form element with submit handler
        <form onSubmit={handleSubmit}>
            {/* Input for note title */}
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
            />
            {/* Textarea for note content */}
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Content"
            />
            {/* Submit button with dynamic text based on noteToEdit prop */}
            <button type="submit">{noteToEdit ? "Update" : "Create"}</button>
        </form>
    );
};

export default NoteForm;  // Ensure this line is at the end
