import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EquationToolbar } from '@/components/EquationToolbar';
import { LaTeXPreview } from '@/components/LaTeXPreview';
import { Eye, Edit3, Save } from 'lucide-react';

export const NotesEditor = ({ note, onUpdateNote, isCreating, setIsCreating }) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [activeTab, setActiveTab] = useState('edit');

  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
    if (isCreating) {
      setActiveTab('edit');
      setIsCreating(false);
    }
  }, [note.id, isCreating, setIsCreating]);

  const handleSave = () => {
    onUpdateNote({ title, content });
  };

  const handleTitleChange = (newTitle) => {
    setTitle(newTitle);
    onUpdateNote({ title: newTitle });
  };

  const handleContentChange = (newContent) => {
    setContent(newContent);
    onUpdateNote({ content: newContent });
  };

  const insertSymbol = (latex) => {
    const textarea = document.querySelector('textarea');
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newContent = content.substring(0, start) + latex + content.substring(end);
      setContent(newContent);
      onUpdateNote({ content: newContent });
      
      // Restore cursor position
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + latex.length, start + latex.length);
      }, 0);
    }
  };

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader className="border-b">
        <Input
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          className="text-xl font-semibold border-none p-0 focus:ring-0 bg-transparent"
          placeholder="Note title..."
        />
      </CardHeader>
      
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex items-center justify-between px-6 py-3 border-b bg-gray-50">
            <TabsList className="grid w-fit grid-cols-2">
              <TabsTrigger value="edit" className="flex items-center space-x-2">
                <Edit3 className="h-4 w-4" />
                <span>Edit</span>
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex items-center space-x-2">
                <Eye className="h-4 w-4" />
                <span>Preview</span>
              </TabsTrigger>
            </TabsList>
            
            <Button onClick={handleSave} size="sm" className="bg-green-600 hover:bg-green-700">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>

          <TabsContent value="edit" className="mt-0">
            <div className="p-6 space-y-4">
              <EquationToolbar onInsertSymbol={insertSymbol} />
              <Textarea
                value={content}
                onChange={(e) => handleContentChange(e.target.value)}
                placeholder="Start typing your note... Use $ for inline equations like $E = mc^2$ or $$ for block equations"
                className="min-h-[400px] font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </TabsContent>

          <TabsContent value="preview" className="mt-0">
            <div className="p-6">
              <LaTeXPreview content={content} />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
