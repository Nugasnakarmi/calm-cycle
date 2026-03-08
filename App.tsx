import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/types';
import HomeScreen from './src/screens/HomeScreen';
import SymptomTrackerScreen from './src/screens/SymptomTrackerScreen';
import ManagementPlanScreen from './src/screens/ManagementPlanScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#f5f8fa' },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SymptomTracker" component={SymptomTrackerScreen} />
        <Stack.Screen name="ManagementPlan" component={ManagementPlanScreen} />
      </Stack.Navigator>
      <StatusBar style="dark" />
    </NavigationContainer>
  );
}


