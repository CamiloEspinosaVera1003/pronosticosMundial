import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useBracket } from '../context/BracketContext';
import { COLORS } from '../constants/theme';

export const WelcomeScreen = ({ onNext }: { onNext: () => void }) => {
  const { setUserName } = useBracket();
  const [name, setName] = useState('');

  const handleStart = () => {
    if (name.trim()) {
      setUserName(name.trim());
      onNext();
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/images/panpaya.png')} 
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>PRODE MUNDIAL 2026</Text>
      <Text style={styles.subtitle}>¡Ingresa tu pronóstico y demuestra cuánto sabes!</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="JUGADOR (EJ: JUAN PÉREZ)"
          placeholderTextColor={COLORS.textSecondary}
          value={name}
          onChangeText={setName}
        />
        <TouchableOpacity 
          style={[styles.button, !name.trim() && styles.buttonDisabled]} 
          onPress={handleStart}
          disabled={!name.trim()}
        >
          <Text style={styles.buttonText}>COMENZAR PRODE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background, // Ahora es rojo
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 250,
    height: 100,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#FFCCCC',
    marginBottom: 40,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    maxWidth: 400,
  },
  input: {
    backgroundColor: COLORS.boxBackground, // Blanco
    color: COLORS.textPrimary, // Negro
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.white,
    marginBottom: 20,
    fontSize: 16,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  button: {
    backgroundColor: COLORS.black,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.black,
  },
  buttonDisabled: {
    backgroundColor: '#333333',
    opacity: 0.7,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
