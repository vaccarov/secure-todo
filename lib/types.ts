
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export interface TodoContextType {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, text: string) => void;
  editingTodo: Todo | null;
  setEditingTodo: (todo: Todo | null) => void;
}