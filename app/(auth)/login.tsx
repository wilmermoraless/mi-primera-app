import { StyleSheet, TextInput, TouchableOpacity, Alert, View } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { supabase } from '@/lib/supabase';
import { AuthError } from '@supabase/supabase-js';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Error', (error as AuthError).message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      Alert.alert('Éxito', 'Por favor verifica tu correo electrónico para confirmar tu cuenta');
      // Limpiar los campos después del registro
      setEmail('');
      setPassword('');
    } catch (error) {
      Alert.alert('Error', (error as AuthError).message);
    } finally {
      setLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: 'mi-app://auth/callback'
        }
      });

      if (error) throw error;
      // No necesitamos redirigir aquí, el listener de auth en _layout.tsx lo hará
    } catch (error) {
      Alert.alert('Error', (error as AuthError).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Iniciar Sesión</ThemedText>
      
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.primaryButton]} 
          onPress={handleLogin}
          disabled={loading}
        >
          <ThemedText style={styles.buttonText}>
            {loading ? 'Cargando...' : 'Iniciar Sesión'}
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.secondaryButton]} 
          onPress={handleSignUp}
          disabled={loading}
        >
          <ThemedText style={styles.buttonText}>Registrarse</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.githubButton]} 
          onPress={handleGithubLogin}
          disabled={loading}
        >
          <ThemedText style={styles.buttonText}>Iniciar Sesión con GitHub</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#000',
  },
  buttonContainer: {
    gap: 10,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  secondaryButton: {
    backgroundColor: '#34C759',
  },
  githubButton: {
    backgroundColor: '#24292e',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 