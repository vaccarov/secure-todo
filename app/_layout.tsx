
import { AuthProvider } from '@/context/AuthContext';
import { TodoProvider } from '@/context/TodoContext';
import { Slot } from 'expo-router';
import React from 'react';

export default function RootLayout(): React.ReactElement {
  return (
    <AuthProvider>
      <TodoProvider>
        <Slot />
      </TodoProvider>
    </AuthProvider>
  );
}
