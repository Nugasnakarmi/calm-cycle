import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProgressEntry } from '../types';
import {
  saveProgressEntry,
  updateProgressEntry,
  getProgressEntries,
  getEntryForDate,
} from '../db/database';
import { SYMPTOMS } from '../constants/endometriosis';

function todayString(): string {
  const d = new Date();
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
}

const PAIN_LABELS: Record<number, string> = {
  0: 'None',
  1: 'Minimal',
  2: 'Mild',
  3: 'Moderate',
  4: 'Uncomfortable',
  5: 'Distressing',
  6: 'Intense',
  7: 'Very Intense',
  8: 'Severe',
  9: 'Very Severe',
  10: 'Unbearable',
};

const PAIN_COLOR = (level: number): string => {
  if (level <= 2) return '#4caf93';
  if (level <= 4) return '#f4a344';
  if (level <= 6) return '#e07b3a';
  return '#c0392b';
};

// ── History Card ──────────────────────────────────────────────────────────────

function HistoryCard({ entry }: { entry: ProgressEntry }) {
  const [expanded, setExpanded] = useState(false);
  const symptomNames = entry.symptoms
    .map((id) => SYMPTOMS.find((s) => s.id === id)?.name ?? id)
    .filter(Boolean);

  return (
    <TouchableOpacity
      style={styles.historyCard}
      activeOpacity={0.8}
      onPress={() => setExpanded((v) => !v)}
    >
      <View style={styles.historyCardTop}>
        <View>
          <Text style={styles.historyDate}>{formatDate(entry.date)}</Text>
          {symptomNames.length > 0 && (
            <Text style={styles.historySymptoms} numberOfLines={1}>
              {symptomNames.slice(0, 3).join(', ')}
              {symptomNames.length > 3 ? ` +${symptomNames.length - 3}` : ''}
            </Text>
          )}
        </View>
        <View style={styles.historyRight}>
          <View style={[styles.painBadge, { backgroundColor: PAIN_COLOR(entry.painLevel) }]}>
            <Text style={styles.painBadgeNum}>{entry.painLevel}</Text>
          </View>
          <Text style={styles.historyChevron}>{expanded ? '▾' : '▸'}</Text>
        </View>
      </View>
      {expanded && (
        <View style={styles.historyExpanded}>
          <Text style={styles.historyExpandLabel}>Pain level:</Text>
          <Text style={styles.historyExpandValue}>
            {entry.painLevel}/10 — {PAIN_LABELS[entry.painLevel]}
          </Text>
          {symptomNames.length > 0 && (
            <>
              <Text style={styles.historyExpandLabel}>Symptoms:</Text>
              <Text style={styles.historyExpandValue}>{symptomNames.join(', ')}</Text>
            </>
          )}
          {entry.completedItems.length > 0 && (
            <>
              <Text style={styles.historyExpandLabel}>Plan items done:</Text>
              <Text style={styles.historyExpandValue}>{entry.completedItems.length}</Text>
            </>
          )}
          {entry.notes.trim().length > 0 && (
            <>
              <Text style={styles.historyExpandLabel}>Notes:</Text>
              <Text style={styles.historyExpandValue}>{entry.notes}</Text>
            </>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

// ── Log Form ──────────────────────────────────────────────────────────────────

function LogForm({
  initial,
  onSaved,
}: {
  initial: ProgressEntry | null;
  onSaved: (entry: ProgressEntry) => void;
}) {
  const today = todayString();
  const [painLevel, setPainLevel] = useState(initial?.painLevel ?? 0);
  const [selectedSymptoms, setSelectedSymptoms] = useState<Set<string>>(
    new Set(initial?.symptoms ?? [])
  );
  const [notes, setNotes] = useState(initial?.notes ?? '');
  const [saving, setSaving] = useState(false);

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const entry: ProgressEntry = {
        id: initial?.id,
        date: today,
        painLevel,
        symptoms: Array.from(selectedSymptoms),
        notes,
        completedItems: initial?.completedItems ?? [],
      };
      if (initial?.id) {
        await updateProgressEntry(entry);
      } else {
        await saveProgressEntry(entry);
      }
      onSaved(entry);
    } catch {
      Alert.alert('Error', 'Could not save your entry. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.form}>
      {/* Pain Level */}
      <Text style={styles.formLabel}>Pain Level: {painLevel}/10 — {PAIN_LABELS[painLevel]}</Text>
      <View style={styles.painRow}>
        {Array.from({ length: 11 }, (_, i) => (
          <TouchableOpacity
            key={i}
            style={[
              styles.painDot,
              { backgroundColor: i <= painLevel ? PAIN_COLOR(painLevel) : '#e8dff2' },
              painLevel === i && styles.painDotActive,
            ]}
            onPress={() => setPainLevel(i)}
          >
            <Text
              style={[styles.painDotText, i <= painLevel && styles.painDotTextActive]}
            >
              {i}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Symptoms Today */}
      <Text style={styles.formLabel}>Symptoms Today</Text>
      <View style={styles.symptomsGrid}>
        {SYMPTOMS.map((s) => {
          const sel = selectedSymptoms.has(s.id);
          return (
            <TouchableOpacity
              key={s.id}
              style={[styles.symptomChip, sel && styles.symptomChipSelected]}
              activeOpacity={0.75}
              onPress={() => toggleSymptom(s.id)}
            >
              <Text style={[styles.symptomChipText, sel && styles.symptomChipTextSelected]}>
                {s.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Notes */}
      <Text style={styles.formLabel}>Notes</Text>
      <TextInput
        style={styles.notesInput}
        value={notes}
        onChangeText={setNotes}
        placeholder="How are you feeling today? Any observations..."
        placeholderTextColor="#b89ec8"
        multiline
        numberOfLines={4}
        textAlignVertical="top"
      />

      <TouchableOpacity
        style={[styles.saveButton, saving && styles.saveButtonDisabled]}
        activeOpacity={0.8}
        onPress={handleSave}
        disabled={saving}
      >
        {saving ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Text style={styles.saveButtonText}>
            {initial?.id ? 'Update Entry' : 'Save Entry'} ✓
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

// ── Main Screen ───────────────────────────────────────────────────────────────

type Tab = 'log' | 'history';

export default function ProgressTrackerScreen() {
  const [tab, setTab] = useState<Tab>('log');
  const [todayEntry, setTodayEntry] = useState<ProgressEntry | null>(null);
  const [history, setHistory] = useState<ProgressEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const [todayEnt, allEntries] = await Promise.all([
        getEntryForDate(todayString()),
        getProgressEntries(),
      ]);
      setTodayEntry(todayEnt);
      setHistory(allEntries);
    } catch {
      // non-fatal
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const handleSaved = useCallback(
    (entry: ProgressEntry) => {
      Alert.alert('Saved!', 'Your progress entry has been saved.', [
        { text: 'View History', onPress: () => setTab('history') },
        { text: 'OK' },
      ]);
      refresh();
    },
    [refresh]
  );

  const pastEntries = history.filter((e) => e.date !== todayString());

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Screen Header */}
      <View style={styles.screenHeader}>
        <Text style={styles.screenTitle}>Track Progress</Text>
      </View>

      {/* Sub-tabs */}
      <View style={styles.subTabs}>
        <TouchableOpacity
          style={[styles.subTab, tab === 'log' && styles.subTabActive]}
          onPress={() => setTab('log')}
        >
          <Text style={[styles.subTabText, tab === 'log' && styles.subTabTextActive]}>
            📝 Log Today
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.subTab, tab === 'history' && styles.subTabActive]}
          onPress={() => setTab('history')}
        >
          <Text style={[styles.subTabText, tab === 'history' && styles.subTabTextActive]}>
            📅 History
          </Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator style={styles.loader} color="#5c3d6e" size="large" />
      ) : tab === 'log' ? (
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <Text style={styles.dateLabel}>
            {formatDate(todayString())}
            {todayEntry ? '  ✏️ Update today\'s entry' : '  — New entry'}
          </Text>
          <LogForm initial={todayEntry} onSaved={handleSaved} />
        </ScrollView>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {todayEntry && (
            <>
              <Text style={styles.sectionLabel}>TODAY</Text>
              <HistoryCard entry={todayEntry} />
            </>
          )}
          {pastEntries.length > 0 ? (
            <>
              <Text style={styles.sectionLabel}>PAST ENTRIES</Text>
              {pastEntries.map((e) => (
                <HistoryCard key={e.id} entry={e} />
              ))}
            </>
          ) : (
            !todayEntry && (
              <View style={styles.emptyState}>
                <Text style={styles.emptyIcon}>📋</Text>
                <Text style={styles.emptyTitle}>No entries yet</Text>
                <Text style={styles.emptyText}>
                  Start logging your daily progress to track patterns over time.
                </Text>
                <TouchableOpacity
                  style={styles.emptyButton}
                  onPress={() => setTab('log')}
                >
                  <Text style={styles.emptyButtonText}>Log Today →</Text>
                </TouchableOpacity>
              </View>
            )
          )}
        </ScrollView>
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
  loader: { flex: 1 },

  screenHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: PRIMARY_LIGHT,
    backgroundColor: WHITE,
  },
  screenTitle: { fontSize: 20, fontWeight: '700', color: TEXT_DARK, textAlign: 'center' },

  subTabs: {
    flexDirection: 'row',
    backgroundColor: WHITE,
    borderBottomWidth: 1,
    borderBottomColor: PRIMARY_LIGHT,
  },
  subTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  subTabActive: { borderBottomColor: PRIMARY },
  subTabText: { fontSize: 14, color: TEXT_MID, fontWeight: '500' },
  subTabTextActive: { color: PRIMARY, fontWeight: '700' },

  scrollContent: { padding: 16, paddingBottom: 40 },
  dateLabel: { fontSize: 14, color: PRIMARY, fontWeight: '600', marginBottom: 16 },

  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: TEXT_MID,
    letterSpacing: 1,
    marginBottom: 8,
    marginTop: 12,
  },

  // Form
  form: { backgroundColor: WHITE, borderRadius: 16, padding: 16, marginBottom: 12 },
  formLabel: { fontSize: 14, fontWeight: '600', color: TEXT_DARK, marginBottom: 10, marginTop: 14 },

  painRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 4,
  },
  painDot: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4,
    marginBottom: 4,
  },
  painDotActive: { borderWidth: 2, borderColor: WHITE },
  painDotText: { fontSize: 11, color: TEXT_MID, fontWeight: '600' },
  painDotTextActive: { color: WHITE },

  symptomsGrid: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 4 },
  symptomChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#ddd0ea',
    marginRight: 6,
    marginBottom: 8,
    backgroundColor: BG,
  },
  symptomChipSelected: { backgroundColor: PRIMARY, borderColor: PRIMARY },
  symptomChipText: { fontSize: 12, color: TEXT_MID },
  symptomChipTextSelected: { color: WHITE, fontWeight: '600' },

  notesInput: {
    borderWidth: 1.5,
    borderColor: '#ddd0ea',
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    color: TEXT_DARK,
    backgroundColor: BG,
    minHeight: 90,
    marginBottom: 4,
  },

  saveButton: {
    backgroundColor: PRIMARY,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  saveButtonDisabled: { backgroundColor: '#c4a8d8' },
  saveButtonText: { color: WHITE, fontSize: 15, fontWeight: '700' },

  // History
  historyCard: {
    backgroundColor: WHITE,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e8dff2',
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  historyCardTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  historyDate: { fontSize: 15, fontWeight: '700', color: TEXT_DARK },
  historySymptoms: { fontSize: 12, color: TEXT_MID, marginTop: 2 },
  historyRight: { flexDirection: 'row', alignItems: 'center' },
  painBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  painBadgeNum: { color: WHITE, fontWeight: '700', fontSize: 14 },
  historyChevron: { fontSize: 16, color: TEXT_MID },

  historyExpanded: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: PRIMARY_LIGHT,
  },
  historyExpandLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: TEXT_MID,
    marginTop: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  historyExpandValue: { fontSize: 14, color: TEXT_DARK, marginTop: 2 },

  // Empty state
  emptyState: { alignItems: 'center', paddingTop: 60 },
  emptyIcon: { fontSize: 56 },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: TEXT_DARK, marginTop: 16 },
  emptyText: {
    fontSize: 14,
    color: TEXT_MID,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  emptyButton: {
    marginTop: 24,
    backgroundColor: PRIMARY,
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 24,
  },
  emptyButtonText: { color: WHITE, fontWeight: '700', fontSize: 15 },
});
