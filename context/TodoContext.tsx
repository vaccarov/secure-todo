import { TODO_STORAGE_KEY } from '@/lib/constants';
import { Todo, TodoContextType } from '@/lib/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';

export const TodoContext = createContext<TodoContextType | undefined>(undefined);

interface TodoProviderProps {
  children: React.ReactNode;
}

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }: TodoProviderProps): React.ReactElement => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const storedTodos: string | null = await AsyncStorage.getItem(TODO_STORAGE_KEY);
        if (storedTodos) {
          setTodos(JSON.parse(storedTodos));
        }
      } catch (error) {
        console.error('Failed to load todos from storage', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadTodos();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const saveTodos = async () => {
        try {
          await AsyncStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
        } catch (error) {
          console.error('Failed to save todos to storage', error);
        }
      };
      saveTodos();
    }
  }, [todos, isLoading]);

  const addTodo = (text: string): void => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: string): void => {
    setTodos(
      todos.map((todo: Todo): Todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string): void => {
    setTodos(todos.filter((todo: Todo): boolean => todo.id !== id));
  };

  const updateTodo = (id: string, text: string): void => {
    setTodos(
      todos.map((todo: Todo): Todo =>
        todo.id === id ? { ...todo, text } : todo
      )
    );
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, toggleTodo, deleteTodo, updateTodo, editingTodo, setEditingTodo }}>
      {children}
    </TodoContext.Provider>
  );
};
