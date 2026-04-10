import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import { BracketProvider } from './src/context/BracketContext';
import { WelcomeScreen } from './src/screens/WelcomeScreen';
import { BracketScreen } from './src/screens/BracketScreen';

export default function App() {
  const [started, setStarted] = useState(false);

  return (
    <BracketProvider>
      <View style={styles.container}>
        <StatusBar style="light" />
        {!started ? (
          <WelcomeScreen onNext={() => setStarted(true)} />
        ) : (
          <BracketScreen />
        )}
      </View>
    </BracketProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
});
