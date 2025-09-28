import TodoItem from '@/app/components/TodoItem';
import { TodoContext } from '@/context/TodoContext';
import { globalStyles } from '@/lib/globalStyles';
import { Todo, TodoContextType } from '@/lib/types';
import { IconCheck, IconPlus } from '@tabler/icons-react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

// useBehavior is a workaround to fix a known bug with KeyboardAvoidingView: https://github.com/facebook/react-native/issues/52596
export function useBehavior() {
  const defaultValue: KeyboardAvoidingViewProps['behavior'] = Platform.OS === 'ios' ? 'padding' : 'height';
  const [behaviour, setBehaviour] = useState<KeyboardAvoidingViewProps['behavior']>(defaultValue);
  useEffect(() => {
    const showListener = Keyboard.addListener('keyboardDidShow', () => {
      setBehaviour(defaultValue);
    });
    const hideListener = Keyboard.addListener('keyboardDidHide', () => {
      setBehaviour(undefined);
    });
    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, [defaultValue]);
  return behaviour;
}

export default function TodoList(): React.ReactElement {
  const context = useContext(TodoContext);
  if (!context) {
    return (
      <View>
        <Text>Error: TodoContext is not available</Text>
      </View>
    );
  }
  const keyboardBehaviour = useBehavior();
  const inputRef: React.RefObject<TextInput | null> = useRef<TextInput>(null);
  const [text, setText] = useState<string>('');
  const { todos, addTodo, editingTodo, setEditingTodo, updateTodo }: TodoContextType = context;

  useEffect(() => {
    if (editingTodo) {
      setText(editingTodo.text);
      inputRef.current?.focus();
    } else {
      setText('');
    }
  }, [editingTodo]);

  const handleAddOrUpdateTodo = (): void => {
    const textTrimmed: string = text.trim();
    if (textTrimmed) {
      if (editingTodo) {
        updateTodo(editingTodo.id, textTrimmed);
        setEditingTodo(null);
      } else {
        addTodo(textTrimmed);
      }
      setText('');
      inputRef.current?.blur();
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={keyboardBehaviour}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <FlatList
        data={todos}
        renderItem={({ item }: { item: Todo }): React.ReactElement => <TodoItem item={item} />}
        keyExtractor={(item: Todo): string => item.id}
        style={styles.flatList}
        keyboardShouldPersistTaps="handled"
      />
      <View style={styles.inputContainer}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder={editingTodo ? 'Edit TODO' : 'Add a new TODO'}
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity
          style={[globalStyles.button, !text && globalStyles.disabledButton]}
          onPress={handleAddOrUpdateTodo}
          disabled={!text}
        >
          {editingTodo ? <IconCheck /> : <IconPlus />}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  flatList: {
    flex: 1
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 10
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 16,
    flex: 1,
    paddingStart: 10
  }
});
