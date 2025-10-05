import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { View, ActivityIndicator, useColorScheme, Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, RegisterScreen, HomeScreen } from '../screens';
import { useAuth } from '../context/AuthContext';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type AppStackParamList = {
  Home: undefined;
};

const CreateStack = Platform.OS === 'web' ? createStackNavigator : createNativeStackNavigator;
const AuthStack = CreateStack<AuthStackParamList>();
const AppStack = CreateStack<AppStackParamList>();

function AuthNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={LoginScreen} options={{ title: 'Iniciar sesión' }} />
      <AuthStack.Screen name="Register" component={RegisterScreen} options={{ title: 'Crear cuenta' }} />
    </AuthStack.Navigator>
  );
}

function AppNavigatorInner() {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
    </AppStack.Navigator>
  );
}

export default function AppNavigator() {
  const scheme = useColorScheme();
  const { user, loading } = useAuth();

  if (loading)
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      {user ? <AppNavigatorInner /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
