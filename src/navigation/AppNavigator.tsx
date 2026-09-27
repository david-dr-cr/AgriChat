import React from 'react';

import {
  ActivityIndicator,
  View,
} from 'react-native';

import {
  NavigationContainer,
} from '@react-navigation/native';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import { useAuth } from '../context/AuthContext';

import AuthScreen from '../screens/auth/AuthScreen';
import FarmerHomeScreen from '../screens/farmer/FarmerHomeScreen';
import ExpertHomeScreen from '../screens/expert/ExpertHomeScreen';
import AdminHomeScreen from '../screens/admin/AdminHomeScreen';
import DiagnosticChatScreen from '../screens/farmer/DiagnosticChatScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const {
    user,
    loading,
  } = useAuth();

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator
          size="large"
          color="#2E7D32"
        />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {!user ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="Auth"
            component={AuthScreen}
          />
        </Stack.Navigator>

      ) : user.role === 'administrateur' ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="AdminHome"
            component={AdminHomeScreen}
          />
        </Stack.Navigator>

      ) : user.role === 'expert' ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="ExpertHome"
            component={ExpertHomeScreen}
          />
        </Stack.Navigator>

      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="FarmerHome"
            component={FarmerHomeScreen}
          />

          <Stack.Screen
            name="DiagnosticChat"
            component={DiagnosticChatScreen}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;