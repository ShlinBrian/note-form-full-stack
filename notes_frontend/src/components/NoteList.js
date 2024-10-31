import React, { useEffect, useState } from 'react';
import axios from 'axios';

// NoteList component that takes an onEdit function as a prop
const NoteList = ({ onEdit }) => {
    // State to hold the list of notes
    const [notes, setNotes] = useState([]);

    // useEffect hook to fetch notes from the server when the component mounts
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/notes")
            .then((response) => setNotes(response.data)) // Set the notes state with the fetched data
            .catch((error) => console.error(error)); // Log any errors
    }, []);

    // Function to delete a note by its id
    const deleteNote = (id) => {
        axios.delete(`http://127.0.0.1:8000/notes/${id}`)
            .then(() => setNotes(notes.filter(note => note.id !== id))) // Update the notes state to remove the deleted note
            .catch((error) => console.error(error)); // Log any errors
    };

    return (
        <div>
            <h2>Notes</h2>
            <ul>
                {notes.map((note) => (
                    <li key={note.id}>
                        <h3>{note.title}</h3>
                        <p>{note.content}</p>
                        <button onClick={() => onEdit(note)}>Edit</button> {/* Button to edit the note */}
                        <button onClick={() => deleteNote(note.id)}>Delete</button> {/* Button to delete the note */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NoteList;
