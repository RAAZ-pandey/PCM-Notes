const API_URL = import.meta.env.VITE_API_URL;

// ✅ Get all notes
export async function getNotes() {
  const response = await fetch(`${API_URL}/notes`);
  if (!response.ok) {
    throw new Error('Failed to fetch notes');
  }
  return await response.json();
}

// ✅ Get single note by ID
export async function getNote(id) {
  const response = await fetch(`${API_URL}/notes/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch note');
  }
  return await response.json();
}

// ✅ Create new note (title & content optional)
export async function createNote(title = 'New Note', content = '') {
  const response = await fetch(`${API_URL}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content })
  });
  if (!response.ok) {
    throw new Error('Failed to create note');
  }
  return await response.json(); // returns note with _id, title, content, createdAt, updatedAt
}

// ✅ Update note by ID
export async function updateNote(id, updates) {
  const response = await fetch(`${API_URL}/notes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: updates.title,
      content: updates.content
    })
  });
  if (!response.ok) {
    throw new Error('Failed to update note');
  }
  return await response.json();
}

// ✅ Delete note by ID
export async function deleteNote(id) {
  const response = await fetch(`${API_URL}/notes/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error('Failed to delete note');
  }
  return await response.json();
}
