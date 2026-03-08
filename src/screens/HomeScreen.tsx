import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.logo}>🌸</Text>
        <Text style={styles.title}>Calm Cycle</Text>
        <Text style={styles.subtitle}>Endometriosis Management & Support</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Welcome</Text>
        <Text style={styles.infoText}>
          This app is designed to help you manage endometriosis symptoms through
          personalized diet, exercise, and lifestyle recommendations.
        </Text>
        <Text style={styles.infoText}>
          Track your symptoms and receive evidence-based guidance for your wellness journey.
        </Text>
      </View>

      <View style={styles.aboutCard}>
        <Text style={styles.cardTitle}>About Endometriosis</Text>
        <Text style={styles.aboutText}>
          Endometriosis is a condition where tissue similar to the lining of the uterus
          grows outside the uterus. It affects approximately 1 in 10 women of reproductive age.
        </Text>
        <Text style={styles.aboutText}>
          Common symptoms include pelvic pain, painful periods, pain during intercourse,
          digestive issues, fatigue, and more.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => router.push('/symptom-tracker')}
      >
        <Text style={styles.primaryButtonText}>Track Symptoms</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Always consult with your healthcare provider for medical advice
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f8fa',
  },
  contentContainer: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    fontSize: 64,
    marginBottom: 12,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#2d5f5d',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#5a8c8a',
    textAlign: 'center',
    fontWeight: '500',
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2d5f5d',
    marginBottom: 16,
  },
  infoText: {
    fontSize: 16,
    color: '#4a5568',
    lineHeight: 24,
    marginBottom: 12,
  },
  aboutCard: {
    backgroundColor: '#e8f5f1',
    borderRadius: 16,
    padding: 24,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#b8dcd5',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2d5f5d',
    marginBottom: 12,
  },
  aboutText: {
    fontSize: 15,
    color: '#4a5568',
    lineHeight: 22,
    marginBottom: 10,
  },
  primaryButton: {
    backgroundColor: '#3d8b85',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  footer: {
    marginTop: 32,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  footerText: {
    fontSize: 13,
    color: '#718096',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
