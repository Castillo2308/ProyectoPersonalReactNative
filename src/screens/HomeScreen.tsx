import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useAuth } from '../context/AuthContext';

const sampleData = [
  { id: '1', title: 'Tarea 1' },
  { id: '2', title: 'Tarea 2' },
  { id: '3', title: 'Tarea 3' },
];

export default function HomeScreen() {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hola, {user?.name}</Text>
      <Text style={styles.subtitle}>Tu lista:</Text>
      <FlatList
        data={sampleData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.title}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      />

      <TouchableOpacity style={styles.logout} onPress={logout}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  greeting: { fontSize: 20, fontWeight: '600' },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 8 },
  item: { padding: 12, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, backgroundColor: '#fafafa' },
  logout: { backgroundColor: '#FF3B30', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 16 },
  logoutText: { color: '#fff', fontWeight: '600' },
});
