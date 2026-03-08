import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f5f1',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1b5e5e',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtleText: {
    fontSize: 16,
    color: '#4a8a80',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to Calm Cycle</Text>
      <Text style={styles.subtleText}>Your journey to mindfulness begins here</Text>
      <StatusBar style="dark" />
    </View>
  );
}


