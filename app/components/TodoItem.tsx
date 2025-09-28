import { TodoContext } from '@/context/TodoContext';
import { globalStyles } from '@/lib/globalStyles';
import { Todo, TodoContextType } from '@/lib/types';
import { IconPencil, IconPencilX } from '@tabler/icons-react-native';
import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface TodoItemProps {
  item: Todo;
}

export default function TodoItem({ item }: TodoItemProps): React.ReactElement {
  const context = useContext(TodoContext);
  if (!context) {
    return (
      <View>
        <Text>Error: TodoContext is not available</Text>
      </View>
    );
  }
  const { toggleTodo, deleteTodo, setEditingTodo, editingTodo }: TodoContextType = context;
  const isEditing: boolean | null = editingTodo && editingTodo.id === item.id;

  return (
    <View style={[styles.todoItem, isEditing && styles.editingTodoItem]}>
      <TouchableOpacity
        onPress={(): void => toggleTodo(item.id)}
        style={styles.todoTextContainer}
      >
        <Text style={[styles.todoText, item.completed && styles.completedTodo]}>{item.text}</Text>
      </TouchableOpacity>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={(): void => setEditingTodo(item)}
          style={globalStyles.button}
        >
          <IconPencil />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={(): void => deleteTodo(item.id)}
          style={globalStyles.button}
        >
          <IconPencilX color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#eee'
  },
  editingTodoItem: {
    backgroundColor: '#e0e0e0'
  },
  todoTextContainer: {
    flex: 1
  },
  todoText: {
    fontSize: 18
  },
  completedTodo: {
    textDecorationLine: 'line-through',
    color: '#aaa'
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 10
  }
});
