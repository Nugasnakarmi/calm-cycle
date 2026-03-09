import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';

export default function RootLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#f5f8fa' },
        }}
      />
      <StatusBar barStyle="dark-content" />
    </>
  );
}
