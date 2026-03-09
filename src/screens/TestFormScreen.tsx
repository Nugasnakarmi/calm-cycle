import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Switch,
  Platform,
} from 'react-native';

export default function TestFormScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [message, setMessage] = useState('');
  const [subscribe, setSubscribe] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert('Required Fields', 'Please fill in your name and email.');
      return;
    }
    setSubmitted(true);
    Alert.alert('Form Submitted', `Name: ${name}\nEmail: ${email}`, [
      { text: 'OK', onPress: () => setSubmitted(false) },
    ]);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setAge('');
    setMessage('');
    setSubscribe(false);
    setSubmitted(false);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Test Form</Text>
        <Text style={styles.headerSubtitle}>Android / iOS render check</Text>
        <View style={styles.platformBadge}>
          <Text style={styles.platformText}>
            Running on: {Platform.OS.toUpperCase()} {Platform.Version}
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionLabel}>Personal Details</Text>

        <Text style={styles.label}>Full Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor="#9ca3af"
          value={name}
          onChangeText={setName}
          autoCorrect={false}
        />

        <Text style={styles.label}>Email Address *</Text>
        <TextInput
          style={styles.input}
          placeholder="you@example.com"
          placeholderTextColor="#9ca3af"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 28"
          placeholderTextColor="#9ca3af"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
          maxLength={3}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionLabel}>Message</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Type something here..."
          placeholderTextColor="#9ca3af"
          value={message}
          onChangeText={setMessage}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>

      <View style={styles.card}>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Subscribe to updates</Text>
          <Switch
            value={subscribe}
            onValueChange={setSubscribe}
            trackColor={{ false: '#d1d5db', true: '#3d8b85' }}
            thumbColor={subscribe ? '#ffffff' : '#f3f4f6'}
          />
        </View>
      </View>

      <View style={styles.statusCard}>
        <Text style={styles.statusTitle}>Field Status</Text>
        <View style={styles.statusRow}>
          <View style={[styles.dot, name ? styles.dotGreen : styles.dotRed]} />
          <Text style={styles.statusText}>Name: {name ? `"${name}"` : 'empty'}</Text>
        </View>
        <View style={styles.statusRow}>
          <View style={[styles.dot, email ? styles.dotGreen : styles.dotRed]} />
          <Text style={styles.statusText}>Email: {email ? `"${email}"` : 'empty'}</Text>
        </View>
        <View style={styles.statusRow}>
          <View style={[styles.dot, age ? styles.dotGreen : styles.dotGray]} />
          <Text style={styles.statusText}>Age: {age || 'not set'}</Text>
        </View>
        <View style={styles.statusRow}>
          <View style={[styles.dot, subscribe ? styles.dotGreen : styles.dotGray]} />
          <Text style={styles.statusText}>Subscribe: {subscribe ? 'Yes' : 'No'}</Text>
        </View>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.submitButton, submitted && styles.submitButtonSuccess]}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>
            {submitted ? '✓ Submitted' : 'Submit'}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.note}>
        This is a temporary test screen to verify Android/iOS rendering works correctly.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  contentContainer: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#6b7280',
    marginBottom: 12,
  },
  platformBadge: {
    backgroundColor: '#dbeafe',
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 14,
  },
  platformText: {
    fontSize: 13,
    color: '#1d4ed8',
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#111827',
    backgroundColor: '#f9fafb',
    marginBottom: 14,
  },
  textArea: {
    height: 100,
    marginBottom: 0,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchLabel: {
    fontSize: 15,
    color: '#374151',
    fontWeight: '500',
  },
  statusCard: {
    backgroundColor: '#f0fdf4',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#bbf7d0',
  },
  statusTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#166534',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  dotGreen: {
    backgroundColor: '#22c55e',
  },
  dotRed: {
    backgroundColor: '#ef4444',
  },
  dotGray: {
    backgroundColor: '#9ca3af',
  },
  statusText: {
    fontSize: 14,
    color: '#374151',
  },
  buttonRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  resetButton: {
    flex: 1,
    backgroundColor: '#e5e7eb',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginRight: 12,
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  submitButton: {
    flex: 2,
    backgroundColor: '#3d8b85',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  submitButtonSuccess: {
    backgroundColor: '#22c55e',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  note: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
