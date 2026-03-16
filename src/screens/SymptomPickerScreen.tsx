import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SYMPTOMS, buildPersonalisedPlan } from '../constants/endometriosis';
import { saveUserSymptoms, loadUserSymptoms } from '../db/database';
import { Symptom, ManagementRecommendation } from '../types';

const CATEGORY_LABELS: Record<Symptom['category'], string> = {
  pain: '💜 Pain',
  menstrual: '🌸 Menstrual',
  digestive: '🌿 Digestive',
  other: '✨ Other',
};

const CATEGORY_ORDER: Symptom['category'][] = ['pain', 'menstrual', 'digestive', 'other'];

function groupByCategory(symptoms: Symptom[]): Record<Symptom['category'], Symptom[]> {
  const groups: Record<string, Symptom[]> = {};
  symptoms.forEach((s) => {
    if (!groups[s.category]) groups[s.category] = [];
    groups[s.category].push(s);
  });
  return groups as Record<Symptom['category'], Symptom[]>;
}

// ── Plan View ─────────────────────────────────────────────────────────────────

function PlanSection({
  plan,
  onBack,
}: {
  plan: ManagementRecommendation[];
  onBack: () => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(plan[0]?.title ?? null);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Plan</Text>
        <View style={styles.headerRight} />
      </View>
      <ScrollView contentContainerStyle={styles.planContent}>
        <Text style={styles.planIntro}>
          Based on your symptoms, here are your personalised recommendations:
        </Text>
        {plan.map((rec) => (
          <View key={rec.title} style={styles.planCard}>
            <TouchableOpacity
              style={styles.planCardHeader}
              activeOpacity={0.75}
              onPress={() => setExpanded(expanded === rec.title ? null : rec.title)}
            >
              <Text style={styles.planCardIcon}>{rec.icon}</Text>
              <View style={styles.planCardMeta}>
                <Text style={styles.planCardTitle}>{rec.title}</Text>
                <Text style={styles.planCardDesc}>{rec.description}</Text>
              </View>
              <Text style={styles.chevron}>{expanded === rec.title ? '▾' : '▸'}</Text>
            </TouchableOpacity>
            {expanded === rec.title && (
              <View style={styles.planItems}>
                {rec.items.map((item, i) => (
                  <View key={i} style={styles.planItem}>
                    <Text style={styles.planBullet}>•</Text>
                    <Text style={styles.planItemText}>{item}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

// ── Symptom Picker ────────────────────────────────────────────────────────────

export default function SymptomPickerScreen() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [showPlan, setShowPlan] = useState(false);
  const [plan, setPlan] = useState<ManagementRecommendation[]>([]);

  useEffect(() => {
    loadUserSymptoms()
      .then((saved) => {
        if (saved) setSelected(new Set(saved.symptomIds));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const toggle = useCallback((id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleGetPlan = useCallback(async () => {
    if (!selected.size) {
      Alert.alert('Select Symptoms', 'Please select at least one symptom to get your plan.');
      return;
    }
    try {
      await saveUserSymptoms(Array.from(selected));
    } catch {
      // non-fatal
    }
    const generatedPlan = buildPersonalisedPlan(Array.from(selected));
    setPlan(generatedPlan);
    setShowPlan(true);
  }, [selected]);

  if (showPlan) {
    return <PlanSection plan={plan} onBack={() => setShowPlan(false)} />;
  }

  const grouped = groupByCategory(SYMPTOMS);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.screenTitle}>My Symptoms</Text>
      </View>

      {loading ? (
        <ActivityIndicator style={styles.loader} color="#5c3d6e" size="large" />
      ) : (
        <>
          <ScrollView contentContainerStyle={styles.listContent}>
            <Text style={styles.intro}>
              Select the symptoms you experience to receive a personalised plan.
            </Text>
            {CATEGORY_ORDER.map((cat) => {
              const items = grouped[cat];
              if (!items?.length) return null;
              return (
                <View key={cat} style={styles.categorySection}>
                  <Text style={styles.categoryLabel}>{CATEGORY_LABELS[cat]}</Text>
                  {items.map((symptom) => {
                    const isSelected = selected.has(symptom.id);
                    return (
                      <TouchableOpacity
                        key={symptom.id}
                        style={[styles.symptomRow, isSelected && styles.symptomRowSelected]}
                        activeOpacity={0.75}
                        onPress={() => toggle(symptom.id)}
                      >
                        <View
                          style={[styles.checkbox, isSelected && styles.checkboxSelected]}
                        >
                          {isSelected && <Text style={styles.checkmark}>✓</Text>}
                        </View>
                        <View style={styles.symptomText}>
                          <Text
                            style={[
                              styles.symptomName,
                              isSelected && styles.symptomNameSelected,
                            ]}
                          >
                            {symptom.name}
                          </Text>
                          <Text style={styles.symptomDesc}>{symptom.description}</Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              );
            })}
          </ScrollView>

          <View style={styles.footer}>
            {selected.size > 0 && (
              <Text style={styles.selectedCount}>{selected.size} symptom(s) selected</Text>
            )}
            <TouchableOpacity
              style={[styles.planButton, !selected.size && styles.planButtonDisabled]}
              activeOpacity={0.8}
              onPress={handleGetPlan}
            >
              <Text style={styles.planButtonText}>Get My Plan →</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const PRIMARY = '#5c3d6e';
const PRIMARY_LIGHT = '#ede4f4';
const TEXT_DARK = '#3d2653';
const TEXT_MID = '#8a6a9a';
const BG = '#f5f8fa';
const WHITE = '#ffffff';

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: BG },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: PRIMARY_LIGHT,
    backgroundColor: WHITE,
  },
  backButton: { padding: 4, minWidth: 60 },
  backText: { fontSize: 17, color: PRIMARY, fontWeight: '500' },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 17, fontWeight: '600', color: TEXT_DARK },
  headerRight: { minWidth: 60 },
  screenTitle: { flex: 1, fontSize: 20, fontWeight: '700', color: TEXT_DARK, textAlign: 'center' },

  loader: { flex: 1 },

  // Symptom list
  listContent: { padding: 16, paddingBottom: 120 },
  intro: { fontSize: 14, color: TEXT_MID, marginBottom: 16, lineHeight: 20 },

  categorySection: { marginBottom: 20 },
  categoryLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: PRIMARY,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  symptomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: WHITE,
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1.5,
    borderColor: '#e8dff2',
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  symptomRowSelected: {
    borderColor: PRIMARY,
    backgroundColor: PRIMARY_LIGHT,
  },

  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: TEXT_MID,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    borderColor: PRIMARY,
    backgroundColor: PRIMARY,
  },
  checkmark: { color: WHITE, fontSize: 13, fontWeight: '700' },

  symptomText: { flex: 1 },
  symptomName: { fontSize: 15, fontWeight: '600', color: TEXT_DARK },
  symptomNameSelected: { color: PRIMARY },
  symptomDesc: { fontSize: 12, color: TEXT_MID, marginTop: 2 },

  // Footer / CTA
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: WHITE,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: PRIMARY_LIGHT,
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 8,
  },
  selectedCount: { fontSize: 13, color: TEXT_MID, textAlign: 'center', marginBottom: 8 },
  planButton: {
    backgroundColor: PRIMARY,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  planButtonDisabled: { backgroundColor: '#c4a8d8' },
  planButtonText: { color: WHITE, fontSize: 16, fontWeight: '700' },

  // Plan view
  planContent: { padding: 16, paddingBottom: 40 },
  planIntro: { fontSize: 14, color: TEXT_MID, marginBottom: 16, lineHeight: 20 },

  planCard: {
    backgroundColor: WHITE,
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e8dff2',
    overflow: 'hidden',
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 5,
    elevation: 3,
  },
  planCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  planCardIcon: { fontSize: 28, marginRight: 12 },
  planCardMeta: { flex: 1 },
  planCardTitle: { fontSize: 16, fontWeight: '700', color: TEXT_DARK },
  planCardDesc: { fontSize: 12, color: TEXT_MID, marginTop: 2 },
  chevron: { fontSize: 18, color: TEXT_MID },

  planItems: {
    paddingHorizontal: 16,
    paddingBottom: 14,
    borderTopWidth: 1,
    borderTopColor: PRIMARY_LIGHT,
  },
  planItem: { flexDirection: 'row', marginTop: 10 },
  planBullet: { fontSize: 15, color: PRIMARY, marginRight: 10, marginTop: 1 },
  planItemText: { flex: 1, fontSize: 14, color: TEXT_DARK, lineHeight: 21 },
});
