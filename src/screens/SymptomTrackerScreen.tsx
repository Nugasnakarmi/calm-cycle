import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { SYMPTOMS } from '../constants/endometriosis';

type SymptomTrackerScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SymptomTracker'>;
};

export default function SymptomTrackerScreen({ navigation }: SymptomTrackerScreenProps) {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  const toggleSymptom = (symptomId: string) => {
    if (selectedSymptoms.includes(symptomId)) {
      setSelectedSymptoms(selectedSymptoms.filter(id => id !== symptomId));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptomId]);
    }
  };

  const handleGetPlan = () => {
    if (selectedSymptoms.length === 0) {
      Alert.alert(
        'No Symptoms Selected',
        'Please select at least one symptom to get personalized recommendations.',
        [{ text: 'OK' }]
      );
      return;
    }

    navigation.navigate('ManagementPlan', { symptoms: selectedSymptoms });
  };

  const getCategorySymptoms = (category: string) => {
    return SYMPTOMS.filter(s => s.category === category);
  };

  const renderSymptomCard = (symptom: typeof SYMPTOMS[0]) => {
    const isSelected = selectedSymptoms.includes(symptom.id);
    return (
      <TouchableOpacity
        key={symptom.id}
        style={[styles.symptomCard, isSelected && styles.symptomCardSelected]}
        onPress={() => toggleSymptom(symptom.id)}
        activeOpacity={0.7}
      >
        <View style={styles.symptomHeader}>
          <Text style={[styles.symptomName, isSelected && styles.symptomNameSelected]}>
            {symptom.name}
          </Text>
          <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
            {isSelected && <Text style={styles.checkmark}>✓</Text>}
          </View>
        </View>
        <Text style={[styles.symptomDescription, isSelected && styles.symptomDescriptionSelected]}>
          {symptom.description}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderCategory = (title: string, category: string, emoji: string) => {
    const symptoms = getCategorySymptoms(category);
    if (symptoms.length === 0) return null;

    return (
      <View style={styles.categorySection}>
        <Text style={styles.categoryTitle}>{emoji} {title}</Text>
        {symptoms.map(renderSymptomCard)}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Track Your Symptoms</Text>
          <Text style={styles.subtitle}>
            Select the symptoms you're currently experiencing
          </Text>
        </View>

        {renderCategory('Pain Symptoms', 'pain', '💫')}
        {renderCategory('Menstrual Symptoms', 'menstrual', '🩸')}
        {renderCategory('Digestive Symptoms', 'digestive', '🌿')}
        {renderCategory('Other Symptoms', 'other', '✨')}

        <View style={styles.selectedCount}>
          <Text style={styles.selectedCountText}>
            {selectedSymptoms.length} symptom{selectedSymptoms.length !== 1 ? 's' : ''} selected
          </Text>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.continueButton,
            selectedSymptoms.length === 0 && styles.continueButtonDisabled,
          ]}
          onPress={handleGetPlan}
        >
          <Text style={styles.continueButtonText}>Get Your Plan →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f8fa',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 24,
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#2d5f5d',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#5a8c8a',
    lineHeight: 22,
  },
  categorySection: {
    marginBottom: 28,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2d5f5d',
    marginBottom: 12,
  },
  symptomCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  symptomCardSelected: {
    backgroundColor: '#e8f5f1',
    borderColor: '#3d8b85',
  },
  symptomHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  symptomName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#2d3748',
    flex: 1,
  },
  symptomNameSelected: {
    color: '#2d5f5d',
  },
  symptomDescription: {
    fontSize: 14,
    color: '#718096',
    lineHeight: 20,
  },
  symptomDescriptionSelected: {
    color: '#5a8c8a',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#cbd5e0',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  checkboxSelected: {
    backgroundColor: '#3d8b85',
    borderColor: '#3d8b85',
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  selectedCount: {
    backgroundColor: '#e8f5f1',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  selectedCountText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d5f5d',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    padding: 16,
    paddingBottom: 24,
    flexDirection: 'row',
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  backButton: {
    flex: 1,
    backgroundColor: '#e8f5f1',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#b8dcd5',
  },
  backButtonText: {
    color: '#2d5f5d',
    fontSize: 16,
    fontWeight: '700',
  },
  continueButton: {
    flex: 2,
    backgroundColor: '#3d8b85',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  continueButtonDisabled: {
    backgroundColor: '#cbd5e0',
  },
  continueButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});
