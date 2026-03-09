import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ManagementRecommendation } from './src/types';
import {
  DIET_RECOMMENDATIONS,
  EXERCISE_RECOMMENDATIONS,
  YOGA_RECOMMENDATIONS,
  LIFESTYLE_RECOMMENDATIONS,
} from './src/constants/endometriosis';

const PANELS: ManagementRecommendation[] = [
  DIET_RECOMMENDATIONS,
  EXERCISE_RECOMMENDATIONS,
  YOGA_RECOMMENDATIONS,
  LIFESTYLE_RECOMMENDATIONS,
];

function HomeScreen({ onSelect }: { onSelect: (r: ManagementRecommendation) => void }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.homeContent}>
        <Text style={styles.title}>Calm Cycle</Text>
        <Text style={styles.subtitle}>Your endometriosis companion</Text>
        {PANELS.map((panel) => (
          <TouchableOpacity
            key={panel.title}
            style={styles.card}
            activeOpacity={0.75}
            onPress={() => onSelect(panel)}
          >
            <Text style={styles.cardIcon}>{panel.icon}</Text>
            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>{panel.title}</Text>
              <Text style={styles.cardDescription}>{panel.description}</Text>
            </View>
            <Text style={styles.cardChevron}>›</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function DetailScreen({
  recommendation,
  onBack,
}: {
  recommendation: ManagementRecommendation;
  onBack: () => void;
}) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.detailHeader}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.detailContent}>
        <Text style={styles.detailIcon}>{recommendation.icon}</Text>
        <Text style={styles.detailTitle}>{recommendation.title}</Text>
        <Text style={styles.detailDescription}>{recommendation.description}</Text>
        {recommendation.items.map((item, index) => (
          <View key={index} style={styles.listItem}>
            <Text style={styles.listBullet}>•</Text>
            <Text style={styles.listText}>{item}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default function App() {
  const [current, setCurrent] = useState<ManagementRecommendation | null>(null);

  return (
    <SafeAreaProvider>
      {current ? (
        <DetailScreen recommendation={current} onBack={() => setCurrent(null)} />
      ) : (
        <HomeScreen onSelect={setCurrent} />
      )}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f8fa',
  },
  // Home
  homeContent: {
    padding: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#5c3d6e',
    marginTop: 12,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: '#8a6a9a',
    marginBottom: 28,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 18,
    marginBottom: 14,
    shadowColor: '#5c3d6e',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  cardIcon: {
    fontSize: 32,
    marginRight: 14,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3d2653',
    marginBottom: 2,
  },
  cardDescription: {
    fontSize: 13,
    color: '#8a6a9a',
  },
  cardChevron: {
    fontSize: 24,
    color: '#c4a8d8',
    marginLeft: 8,
  },
  // Detail
  detailHeader: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ede4f4',
    backgroundColor: '#f5f8fa',
  },
  backButton: {
    padding: 4,
  },
  backText: {
    fontSize: 17,
    color: '#5c3d6e',
    fontWeight: '500',
  },
  detailContent: {
    padding: 24,
    paddingBottom: 48,
  },
  detailIcon: {
    fontSize: 52,
    textAlign: 'center',
    marginBottom: 12,
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3d2653',
    textAlign: 'center',
    marginBottom: 6,
  },
  detailDescription: {
    fontSize: 14,
    color: '#8a6a9a',
    textAlign: 'center',
    marginBottom: 24,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  listBullet: {
    fontSize: 16,
    color: '#5c3d6e',
    marginRight: 10,
    marginTop: 1,
  },
  listText: {
    flex: 1,
    fontSize: 15,
    color: '#3d2653',
    lineHeight: 22,
  },
});


