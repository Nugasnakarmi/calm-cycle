import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import {
  DIET_RECOMMENDATIONS,
  EXERCISE_RECOMMENDATIONS,
  YOGA_RECOMMENDATIONS,
  LIFESTYLE_RECOMMENDATIONS,
} from '../constants/endometriosis';

type ManagementPlanScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ManagementPlan'>;
  route: RouteProp<RootStackParamList, 'ManagementPlan'>;
};

export default function ManagementPlanScreen({ navigation, route }: ManagementPlanScreenProps) {
  const { symptoms } = route.params;
  const insets = useSafeAreaInsets();

  const renderRecommendationCard = (recommendation: typeof DIET_RECOMMENDATIONS) => {
    return (
      <View key={recommendation.title} style={styles.recommendationCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.icon}>{recommendation.icon}</Text>
          <View style={styles.cardHeaderText}>
            <Text style={styles.cardTitle}>{recommendation.title}</Text>
            <Text style={styles.cardDescription}>{recommendation.description}</Text>
          </View>
        </View>
        <View style={styles.itemsList}>
          {recommendation.items.map((item, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.itemText}>{item}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 24 }]}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Your Personalized Plan</Text>
          <Text style={styles.subtitle}>
            Based on your {symptoms.length} selected symptom{symptoms.length !== 1 ? 's' : ''}
          </Text>
        </View>

        <View style={styles.encouragementCard}>
          <Text style={styles.encouragementText}>
            You're taking an important step in managing your endometriosis. 
            These evidence-based recommendations can help reduce symptoms and improve your quality of life.
          </Text>
        </View>

        {renderRecommendationCard(DIET_RECOMMENDATIONS)}
        {renderRecommendationCard(EXERCISE_RECOMMENDATIONS)}
        {renderRecommendationCard(YOGA_RECOMMENDATIONS)}
        {renderRecommendationCard(LIFESTYLE_RECOMMENDATIONS)}

        <View style={styles.importantNote}>
          <Text style={styles.noteTitle}>⚕️ Important</Text>
          <Text style={styles.noteText}>
            These recommendations are for general guidance only. Always consult with
            your healthcare provider before making significant changes to your diet,
            exercise routine, or treatment plan.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.startOverButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.startOverButtonText}>Return to Home</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacing} />
      </ScrollView>
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
  },
  header: {
    marginBottom: 20,
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
    fontWeight: '500',
  },
  encouragementCard: {
    backgroundColor: '#fff8e6',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#f4d88e',
  },
  encouragementText: {
    fontSize: 15,
    color: '#744210',
    lineHeight: 22,
    textAlign: 'center',
  },
  recommendationCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  icon: {
    fontSize: 40,
    marginRight: 16,
  },
  cardHeaderText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2d5f5d',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#5a8c8a',
    lineHeight: 20,
  },
  itemsList: {
    marginTop: 8,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingLeft: 8,
  },
  bullet: {
    fontSize: 16,
    color: '#3d8b85',
    marginRight: 12,
    fontWeight: '700',
  },
  itemText: {
    flex: 1,
    fontSize: 15,
    color: '#4a5568',
    lineHeight: 22,
  },
  importantNote: {
    backgroundColor: '#fef5f5',
    borderRadius: 12,
    padding: 20,
    marginTop: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#f8b8b8',
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#c53030',
    marginBottom: 8,
  },
  noteText: {
    fontSize: 14,
    color: '#742a2a',
    lineHeight: 21,
  },
  startOverButton: {
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
  startOverButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  bottomSpacing: {
    height: 40,
  },
});
