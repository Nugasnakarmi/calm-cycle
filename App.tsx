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
import SymptomPickerScreen from './src/screens/SymptomPickerScreen';
import ProgressTrackerScreen from './src/screens/ProgressTrackerScreen';

type TabKey = 'plan' | 'track' | 'tips';

const PANELS: ManagementRecommendation[] = [
  DIET_RECOMMENDATIONS,
  EXERCISE_RECOMMENDATIONS,
  YOGA_RECOMMENDATIONS,
  LIFESTYLE_RECOMMENDATIONS,
];

// ── Tips / Detail screens (existing behaviour) ────────────────────────────────

function TipsDetailScreen({
  recommendation,
  onBack,
}: {
  recommendation: ManagementRecommendation;
  onBack: () => void;
}) {
  return (
    <SafeAreaView style={styles.safeArea}>
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

function TipsScreen() {
  const [detail, setDetail] = useState<ManagementRecommendation | null>(null);
  if (detail) {
    return <TipsDetailScreen recommendation={detail} onBack={() => setDetail(null)} />;
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.tipsHeader}>
        <Text style={styles.screenTitle}>Tips & Guides</Text>
      </View>
      <ScrollView contentContainerStyle={styles.homeContent}>
        <Text style={styles.tipsIntro}>
          General guidance for managing endometriosis day-to-day.
        </Text>
        {PANELS.map((panel) => (
          <TouchableOpacity
            key={panel.title}
            style={styles.card}
            activeOpacity={0.75}
            onPress={() => setDetail(panel)}
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

// ── Bottom Tab Bar ────────────────────────────────────────────────────────────

const TABS: { key: TabKey; label: string; icon: string }[] = [
  { key: 'plan', label: 'My Plan', icon: '📋' },
  { key: 'track', label: 'Track', icon: '📈' },
  { key: 'tips', label: 'Tips', icon: '💡' },
];

function TabBar({
  active,
  onChange,
}: {
  active: TabKey;
  onChange: (t: TabKey) => void;
}) {
  return (
    <View style={styles.tabBar}>
      {TABS.map((t) => (
        <TouchableOpacity
          key={t.key}
          style={styles.tabItem}
          activeOpacity={0.8}
          onPress={() => onChange(t.key)}
        >
          <Text style={styles.tabIcon}>{t.icon}</Text>
          <Text style={[styles.tabLabel, active === t.key && styles.tabLabelActive]}>
            {t.label}
          </Text>
          {active === t.key && <View style={styles.tabIndicator} />}
        </TouchableOpacity>
      ))}
    </View>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('plan');

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <View style={styles.root}>
        <View style={styles.screenArea}>
          {activeTab === 'plan' && <SymptomPickerScreen />}
          {activeTab === 'track' && <ProgressTrackerScreen />}
          {activeTab === 'tips' && <TipsScreen />}
        </View>
        <TabBar active={activeTab} onChange={setActiveTab} />
      </View>
    </SafeAreaProvider>
  );
}

const PRIMARY = '#5c3d6e';
const PRIMARY_LIGHT = '#ede4f4';
const TEXT_DARK = '#3d2653';
const TEXT_MID = '#8a6a9a';
const BG = '#f5f8fa';
const WHITE = '#ffffff';

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: BG },
  screenArea: { flex: 1 },
  safeArea: { flex: 1, backgroundColor: BG },

  // Tab bar
  tabBar: {
    flexDirection: 'row',
    backgroundColor: WHITE,
    borderTopWidth: 1,
    borderTopColor: PRIMARY_LIGHT,
    paddingBottom: 8,
    paddingTop: 6,
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    position: 'relative',
  },
  tabIcon: { fontSize: 20 },
  tabLabel: { fontSize: 11, color: TEXT_MID, marginTop: 2, fontWeight: '500' },
  tabLabelActive: { color: PRIMARY, fontWeight: '700' },
  tabIndicator: {
    position: 'absolute',
    top: 0,
    width: 24,
    height: 2,
    backgroundColor: PRIMARY,
    borderRadius: 2,
  },

  // Tips screen header
  tipsHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: PRIMARY_LIGHT,
    backgroundColor: WHITE,
  },
  screenTitle: { fontSize: 20, fontWeight: '700', color: TEXT_DARK, textAlign: 'center' },
  tipsIntro: { fontSize: 14, color: TEXT_MID, marginBottom: 20, lineHeight: 20 },

  // Home / Tips cards
  homeContent: { padding: 24, paddingBottom: 40 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: WHITE,
    borderRadius: 14,
    padding: 18,
    marginBottom: 14,
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  cardIcon: { fontSize: 32, marginRight: 14 },
  cardText: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: '600', color: TEXT_DARK, marginBottom: 2 },
  cardDescription: { fontSize: 13, color: TEXT_MID },
  cardChevron: { fontSize: 24, color: '#c4a8d8', marginLeft: 8 },

  // Detail
  detailHeader: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: PRIMARY_LIGHT,
    backgroundColor: BG,
  },
  backButton: { padding: 4 },
  backText: { fontSize: 17, color: PRIMARY, fontWeight: '500' },
  detailContent: { padding: 24, paddingBottom: 48 },
  detailIcon: { fontSize: 52, textAlign: 'center', marginBottom: 12 },
  detailTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: TEXT_DARK,
    textAlign: 'center',
    marginBottom: 6,
  },
  detailDescription: {
    fontSize: 14,
    color: TEXT_MID,
    textAlign: 'center',
    marginBottom: 24,
  },
  listItem: { flexDirection: 'row', marginBottom: 12 },
  listBullet: { fontSize: 16, color: PRIMARY, marginRight: 10, marginTop: 1 },
  listText: { flex: 1, fontSize: 15, color: TEXT_DARK, lineHeight: 22 },
});



