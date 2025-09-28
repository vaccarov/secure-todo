import { act, render } from '@testing-library/react-native';
import React from 'react';
import { Text, View } from 'react-native';
import { TodoContext, TodoProvider } from '../context/TodoContext';
import { TodoContextType } from '@/lib/types';

// A simple test component that consumes the TodoContext
const TestComponent: React.FC = () => {
  const context = React.useContext(TodoContext);
  if (!context) return null;

  const { todos, addTodo, toggleTodo, deleteTodo, updateTodo, setEditingTodo, editingTodo } = context as TodoContextType;

  return (
    <View>
      <Text testID="todos">{JSON.stringify(todos)}</Text>
      <Text testID="editingTodo">{JSON.stringify(editingTodo)}</Text>
      <Text
        testID="addTodo"
        onPress={() => addTodo('Test Todo')}
      >
        Add
      </Text>
      <Text
        testID="toggleTodo"
        onPress={() => todos.length > 0 && toggleTodo(todos[0].id)}
      >
        Toggle
      </Text>
      <Text
        testID="deleteTodo"
        onPress={() => todos.length > 0 && deleteTodo(todos[0].id)}
      >
        Delete
      </Text>
      <Text
        testID="updateTodo"
        onPress={() => todos.length > 0 && updateTodo(todos[0].id, 'Updated Todo')}
      >
        Update
      </Text>
      <Text
        testID="setEditingTodo"
        onPress={() => todos.length > 0 && setEditingTodo(todos[0])}
      >
        Set Editing
      </Text>
    </View>
  );
};

describe('TodoContext', () => {
  it('should add a todo', async () => {
    let contextValue: TodoContextType | undefined;
    render(
      <TodoProvider>
        <TodoContext.Consumer>
          {(value) => {
            contextValue = value;
            return <TestComponent />;
          }}
        </TodoContext.Consumer>
      </TodoProvider>
    );

    await act(async () => {
      contextValue?.addTodo('Test Todo');
    });

    expect(contextValue?.todos).toHaveLength(1);
    expect(contextValue?.todos[0].text).toBe('Test Todo');
  });

  it('should toggle a todo', async () => {
    let contextValue: TodoContextType | undefined;
    render(
      <TodoProvider>
        <TodoContext.Consumer>
          {(value) => {
            contextValue = value;
            return <TestComponent />;
          }}
        </TodoContext.Consumer>
      </TodoProvider>
    );

    await act(async () => {
      contextValue?.addTodo('Test Todo');
    });

    await act(async () => {
      contextValue?.toggleTodo(contextValue?.todos[0].id);
    });

    expect(contextValue?.todos[0].completed).toBe(true);
  });

  it('should update a todo', async () => {
    let contextValue: TodoContextType | undefined;
    render(
      <TodoProvider>
        <TodoContext.Consumer>
          {(value) => {
            contextValue = value;
            return <TestComponent />;
          }}
        </TodoContext.Consumer>
      </TodoProvider>
    );

    await act(async () => {
      contextValue?.addTodo('Test Todo');
    });

    await act(async () => {
      contextValue?.updateTodo(contextValue?.todos[0].id, 'Updated Todo');
    });

    expect(contextValue?.todos[0].text).toBe('Updated Todo');
  });

  it('should set a todo to editing', async () => {
    let contextValue: TodoContextType | undefined;
    render(
      <TodoProvider>
        <TodoContext.Consumer>
          {(value) => {
            contextValue = value;
            return <TestComponent />;
          }}
        </TodoContext.Consumer>
      </TodoProvider>
    );

    await act(async () => {
      contextValue?.addTodo('Test Todo');
    });

    await act(async () => {
      contextValue?.setEditingTodo(contextValue?.todos[0]);
    });

    expect(contextValue?.editingTodo).toEqual(contextValue?.todos[0]);
  });

  it('should delete a todo', async () => {
    let contextValue: TodoContextType | undefined;
    render(
      <TodoProvider>
        <TodoContext.Consumer>
          {(value) => {
            contextValue = value;
            return <TestComponent />;
          }}
        </TodoContext.Consumer>
      </TodoProvider>
    );

    await act(async () => {
      contextValue?.addTodo('Test Todo');
    });

    await act(async () => {
      contextValue?.deleteTodo(contextValue?.todos[0].id);
    });

    expect(contextValue?.todos).toHaveLength(0);
  });
});
