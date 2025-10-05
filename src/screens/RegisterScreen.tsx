import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../navigation/AppNavigator';
import { useAuth } from '../context/AuthContext';

export default function RegisterScreen({ navigation }: NativeStackScreenProps<AuthStackParamList, 'Register'>) {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async () => {
    if (!name || !email || !password) {
      Alert.alert('Validación', 'Completa todos los campos');
      return;
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Alert.alert('Validación', 'Correo inválido');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Validación', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }
    if (password !== confirm) {
      Alert.alert('Validación', 'Las contraseñas no coinciden');
      return;
    }
    setSubmitting(true);
    try {
      await register(email.trim(), password, name.trim());
    } catch (e: any) {
      Alert.alert('Error', e.message ?? 'No se pudo registrar');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear cuenta</Text>
      <TextInput style={styles.input} placeholder="Nombre" value={name} onChangeText={setName} />
      <TextInput
        style={styles.input}
        placeholder="Correo"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry value={password} onChangeText={setPassword} />
      <TextInput style={styles.input} placeholder="Confirmar contraseña" secureTextEntry value={confirm} onChangeText={setConfirm} />

      <TouchableOpacity style={[styles.button, submitting && styles.buttonDisabled]} onPress={onSubmit} disabled={submitting}>
        <Text style={styles.buttonText}>{submitting ? 'Creando...' : 'Registrarme'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>¿Ya tienes cuenta? Inicia sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: '600', marginBottom: 24, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 12 },
  button: { backgroundColor: '#34C759', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 4 },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: '#fff', fontWeight: '600' },
  link: { color: '#007AFF', textAlign: 'center', marginTop: 16 },
});
