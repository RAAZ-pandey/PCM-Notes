import { useState } from 'react';
import { NotesEditor } from '@/components/NotesEditor';
import { NotesList } from '@/components/NotesList';
import { Button } from '@/components/ui/button';
import { PlusCircle, BookOpen } from 'lucide-react';

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const createNote = () => {
    const newNote = {
      id: Date.now().toString(),
      title: 'New Note',
      content: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setNotes([newNote, ...notes]);
    setSelectedNote(newNote);
    setIsCreating(true);
  };

  const updateNote = (id, updates) => {
    setNotes(notes.map(note => 
      note.id === id 
        ? { ...note, ...updates, updatedAt: new Date() }
        : note
    ));
    if (selectedNote?.id === id) {
      setSelectedNote({ ...selectedNote, ...updates, updatedAt: new Date() });
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
    if (selectedNote?.id === id) {
      setSelectedNote(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-6">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">PCM Notes</h1>
            </div>
            <Button 
              onClick={createNote}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              New Note
            </Button>
          </div>
          <p className="text-gray-600 mt-2">Create and edit notes with live LaTeX equation rendering</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <NotesList
              notes={notes}
              selectedNote={selectedNote}
              onSelectNote={setSelectedNote}
              onDeleteNote={deleteNote}
            />
          </div>
          
          <div className="lg:col-span-3">
            {selectedNote ? (
              <NotesEditor
                note={selectedNote}
                onUpdateNote={(updates) => updateNote(selectedNote.id, updates)}
                isCreating={isCreating}
                setIsCreating={setIsCreating}
              />
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Select a note to get started</h3>
                <p className="text-gray-500">Choose an existing note or create a new one to begin writing with LaTeX support</p>
                <Button 
                  onClick={createNote}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create Your First Note
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
