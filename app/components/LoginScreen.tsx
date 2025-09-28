import { globalStyles } from '@/lib/globalStyles';
import { IconLogin2, IconSettings } from '@tabler/icons-react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import React, { useContext } from 'react';
import { Alert, Linking, NativeModules, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
const { SecuritySettings } = NativeModules;

/*
As explained in the readme, the goal of NativeModules is to show you that I know how to use it.
However, I did not found the exact intent for "authentication settings" page, therefore I've used to closest I could find: ACTION_SECURITY_SETTINGS
I actually did not needed a native module for this use case: Linking.sendIntent('android.app.action.SET_NEW_PASSWORD') does exactly that.
I just kept the native module button for the demo.
When you hit login button:
  * Auhtentication method is defined -> asks for password/biometrics
  * No method is defined -> redirects to the settings page to set a method
*/

export default function LoginScreen(): React.ReactElement {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return (
      <View>
        <Text>Error: AuthContext is not available</Text>
      </View>
    );
  }
  const { setIsAuthenticated } = authContext;

  const openSettings = async () => {
    if (Platform.OS === 'ios') {
      if (await Linking.canOpenURL('app-settings:')) {
        await Linking.openURL('app-settings:');
      } else {
        Alert.alert('Error', 'Could not open settings.');
      }
    } else {
      try {
        await Linking.sendIntent('android.app.action.SET_NEW_PASSWORD');
      } catch (error: unknown) {
        Alert.alert('Error', 'Could not open lock screen settings. Please open them manually.');
      }
    }
  };

  const authenticate = async (): Promise<void> => {
    const result: LocalAuthentication.LocalAuthenticationResult = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate to access your TODOs'
    });
    if (result.success) {
      setIsAuthenticated(true);
    } else {
      Alert.alert('Authentication failed', 'Could not authenticate. Please try again.');
    }
  };

  const handleSecuritySetttings = async (): Promise<void> => {
    SecuritySettings.openSecuritySettings();
  };

  const handleAuthentication = async (): Promise<void> => {
    const supportedAuthTypes: LocalAuthentication.SecurityLevel = await LocalAuthentication.getEnrolledLevelAsync();
    if (supportedAuthTypes !== LocalAuthentication.SecurityLevel.NONE) {
      authenticate();
      return;
    }
    Alert.alert('Authentication not set up', 'Please set up a passcode or biometrics in your device settings to use this feature.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Open Settings', onPress: openSettings }
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.actions}>
        <Text style={styles.text}>Login to see your TODOs</Text>
        <TouchableOpacity
          style={globalStyles.button}
          onPress={handleAuthentication}
        >
          <IconLogin2 />
        </TouchableOpacity>
      </View>
      <View style={styles.actions}>
        <Text style={styles.text}>Android Native Settings</Text>
        <TouchableOpacity
          style={globalStyles.button}
          onPress={handleSecuritySetttings}
        >
          <IconSettings />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 40,
    gap: 100
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20
  },
  text: {
    fontSize: 18
  }
});
