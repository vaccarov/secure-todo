import LoginScreen from '@/app/components/LoginScreen';
import TodoList from '@/app/components/TodoList';
import { AuthContext } from '@/context/AuthContext';
import { IconLogout } from '@tabler/icons-react-native';
import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../lib/globalStyles';

export default function TodoScreen(): React.ReactElement {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return <Text>Error: AuthContext is not available</Text>;
  }
  const { isAuthenticated, isLoadingAuth, setIsAuthenticated } = authContext;

  const handleLogout = (): void => {
    setIsAuthenticated(false);
  };

  if (isLoadingAuth) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading authentication state...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Secured TODO Liste</Text>
        {isAuthenticated && 
          <TouchableOpacity style={globalStyles.button} onPress={handleLogout}>
            <IconLogout />
          </TouchableOpacity>
        }
      </View>
      {isAuthenticated ? <TodoList /> : <LoginScreen />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
