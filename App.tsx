import React from 'react';
import 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainNavigator from './src/navigator/MainNavigator';
import TryCodeScreen from './src/screens/TryCodeScreen';
import NoteListScreen from './src/screens/NoteListScreen';
const App = () => {
  console.log("app")
  return (
    <SafeAreaProvider>
      <MainNavigator />
    </SafeAreaProvider>
  )
}
export default App;