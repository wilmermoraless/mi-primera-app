import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { supabase } from '../lib/supabase';
import { Button, Input } from '@rneui/themed';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) Alert.alert(error.message);
    else Alert.alert('Registro exitoso. Verifica tu correo electrónico.');
    setLoading(false);
  };

  const handleSignIn = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) Alert.alert(error.message);
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) Alert.alert(error.message);
    setLoading(false);
  };

  const handleFacebookSignIn = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'facebook',
    });
    if (error) Alert.alert(error.message);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Input
        label="Correo electrónico"
        leftIcon={{ type: 'font-awesome', name: 'envelope' }}
        onChangeText={(text) => setEmail(text)}
        value={email}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <Input
        label="Contraseña"
        leftIcon={{ type: 'font-awesome', name: 'lock' }}
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
        autoCapitalize="none"
      />
      <Button 
        title="Iniciar Sesión" 
        onPress={handleSignIn} 
        loading={loading} 
        buttonStyle={styles.button}
      />
      <Button 
        title="Registrarse" 
        onPress={handleSignUp} 
        loading={loading} 
        type="outline"
        buttonStyle={styles.button}
      />
      <Button
        title="Continuar con Google"
        onPress={handleGoogleSignIn}
        loading={loading}
        icon={{ type: 'font-awesome', name: 'google' }}
        buttonStyle={[styles.button, styles.socialButton]}
      />
      <Button
        title="Continuar con Facebook"
        onPress={handleFacebookSignIn}
        loading={loading}
        icon={{ type: 'font-awesome', name: 'facebook' }}
        buttonStyle={[styles.button, styles.socialButton]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  button: {
    marginVertical: 10,
    borderRadius: 8,
  },
  socialButton: {
    backgroundColor: '#4285F4',
  },
});
