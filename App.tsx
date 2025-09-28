import { ExpoRoot } from 'expo-router';
import { ReactElement } from 'react';

export default function App(): ReactElement {
  return <ExpoRoot context={require.context('./app')} />;
}
