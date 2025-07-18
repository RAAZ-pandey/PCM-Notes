import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, FileText } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export const NotesList = ({ notes, selectedNote, onSelectNote, onDeleteNote }) => {
  const getPreview = (content) => {
    // Remove LaTeX expressions for preview
    const preview = content.replace(/\$.*?\$/g, '[equation]').replace(/\n/g, ' ');
    return preview.length > 60 ? preview.substring(0, 60) + '...' : preview;
  };

  if (notes.length === 0) {
    return (
      <Card className="bg-white shadow-lg">
        <CardContent className="p-6 text-center">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500">No notes yet</p>
          <p className="text-sm text-gray-400 mt-1">Create your first note to get started</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Notes</h2>
      {notes.map((note) => (
        <Card 
          key={note._id || note.id}   // ✅ use MongoDB _id or fallback to id
          className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
            selectedNote?.id === (note._id || note.id)
              ? 'ring-2 ring-blue-500 bg-blue-50'
              : 'bg-white hover:bg-gray-50'
          }`}
          onClick={() => onSelectNote({ ...note, id: note._id || note.id })}
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 truncate">{note.title}</h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {getPreview(note.content) || 'Empty note'}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  {formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true })}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteNote(note._id || note.id);
                }}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 ml-2"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
