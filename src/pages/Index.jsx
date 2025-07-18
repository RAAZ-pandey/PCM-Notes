import { useState, useEffect } from 'react';
import { NotesEditor } from '@/components/NotesEditor';
import { NotesList } from '@/components/NotesList';
import { Button } from '@/components/ui/button';
import { PlusCircle, BookOpen } from 'lucide-react';
import { createNote, getNotes, updateNote, deleteNote } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  // ✅ Load all notes from backend when component mounts
  useEffect(() => {
    async function fetchNotes() {
      try {
        const allNotes = await getNotes();
        setNotes(allNotes);
      } catch (error) {
        console.error('Failed to fetch notes:', error);
        toast({ title: 'Failed to load notes', variant: 'destructive' });
      }
    }
    fetchNotes();
  }, [toast]);

  // ✅ Create note in backend & set selected
  const handleCreateNote = async () => {
    try {
      const newNote = await createNote('New Note', '');
      setNotes([newNote, ...notes]);
      setSelectedNote({
        id: newNote._id,
        title: newNote.title,
        content: newNote.content,
        createdAt: newNote.createdAt,
        updatedAt: newNote.updatedAt,
      });
      setIsCreating(true);
      toast({ title: 'Note created! ✏️' });
    } catch (error) {
      console.error('Failed to create note:', error);
      toast({ title: 'Failed to create note', variant: 'destructive' });
    }
  };

  // ✅ Update note in backend
  const handleUpdateNote = async (id, updates) => {
    try {
      const updated = await updateNote(id, updates);
      setNotes(notes.map(note =>
        note._id === id ? updated : note
      ));
      if (selectedNote?.id === id) {
        setSelectedNote({ ...updated, id: updated._id });
      }
      toast({ title: 'Note saved! ✅' });
    } catch (error) {
      console.error('Failed to update note:', error);
      toast({ title: 'Failed to save note', variant: 'destructive' });
    }
  };

  // ✅ Delete note in backend
  const handleDeleteNote = async (id) => {
    try {
      await deleteNote(id);
      setNotes(notes.filter(note => note._id !== id));
      if (selectedNote?.id === id) {
        setSelectedNote(null);
      }
      toast({ title: 'Note deleted! 🗑️' });
    } catch (error) {
      console.error('Failed to delete note:', error);
      toast({ title: 'Failed to delete note', variant: 'destructive' });
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
              onClick={handleCreateNote}
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
              onSelectNote={(note) => setSelectedNote({ ...note, id: note._id })}
              onDeleteNote={handleDeleteNote}
            />
          </div>
          
          <div className="lg:col-span-3">
            {selectedNote ? (
              <NotesEditor
                note={selectedNote}
                onUpdateNote={(updates) => handleUpdateNote(selectedNote.id, updates)}
                isCreating={isCreating}
                setIsCreating={setIsCreating}
              />
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Select a note to get started</h3>
                <p className="text-gray-500">Choose an existing note or create a new one to begin writing with LaTeX support</p>
                <Button 
                  onClick={handleCreateNote}
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
