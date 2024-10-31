from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

# Allow CORS for all origins (development purposes only; restrict in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to specific origins in production, e.g., ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods like GET, POST, PUT, DELETE
    allow_headers=["*"],  # Allows all headers
)

# Dummy data for notes
notes_db = []

# Define Note model
class Note(BaseModel):
    id: int
    title: str
    content: str

# Endpoints remain the same
@app.get("/notes", response_model=List[Note])
def get_notes():
    return notes_db

@app.post("/notes", response_model=Note)
def create_note(note: Note):
    notes_db.append(note)
    return note

@app.put("/notes/{note_id}", response_model=Note)
def update_note(note_id: int, updated_note: Note):
    for i, note in enumerate(notes_db):
        if note.id == note_id:
            notes_db[i] = updated_note
            return updated_note
    raise HTTPException(status_code=404, detail="Note not found")

@app.delete("/notes/{note_id}")
def delete_note(note_id: int):
    for i, note in enumerate(notes_db):
        if note.id == note_id:
            del notes_db[i]
            return {"message": "Note deleted successfully"}
    raise HTTPException(status_code=404, detail="Note not found")

