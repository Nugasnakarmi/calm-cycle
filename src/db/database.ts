import * as SQLite from 'expo-sqlite';
import { ProgressEntry, SavedSymptoms } from '../types';

let db: SQLite.SQLiteDatabase | null = null;

async function getDb(): Promise<SQLite.SQLiteDatabase> {
  if (!db) {
    db = await SQLite.openDatabaseAsync('calm_cycle.db');
    await initSchema(db);
  }
  return db;
}

async function initSchema(database: SQLite.SQLiteDatabase): Promise<void> {
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS progress_entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL UNIQUE,
      pain_level INTEGER NOT NULL DEFAULT 0,
      symptoms TEXT NOT NULL DEFAULT '[]',
      notes TEXT NOT NULL DEFAULT '',
      completed_items TEXT NOT NULL DEFAULT '[]',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    -- Ensure uniqueness on existing databases that pre-date the UNIQUE column constraint
    CREATE UNIQUE INDEX IF NOT EXISTS idx_progress_entries_date ON progress_entries(date);

    CREATE TABLE IF NOT EXISTS user_symptoms (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      symptom_ids TEXT NOT NULL DEFAULT '[]',
      saved_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);
}

// ── Progress Entries ─────────────────────────────────────────────────────────

export async function saveProgressEntry(entry: ProgressEntry): Promise<void> {
  const database = await getDb();
  // INSERT OR REPLACE handles both new entries and updates for the same date
  await database.runAsync(
    `INSERT OR REPLACE INTO progress_entries (date, pain_level, symptoms, notes, completed_items)
     VALUES (?, ?, ?, ?, ?)`,
    [
      entry.date,
      entry.painLevel,
      JSON.stringify(entry.symptoms),
      entry.notes,
      JSON.stringify(entry.completedItems),
    ]
  );
}

export async function updateProgressEntry(entry: ProgressEntry): Promise<void> {
  if (!entry.id) return;
  const database = await getDb();
  await database.runAsync(
    `UPDATE progress_entries
     SET pain_level = ?, symptoms = ?, notes = ?, completed_items = ?
     WHERE id = ?`,
    [
      entry.painLevel,
      JSON.stringify(entry.symptoms),
      entry.notes,
      JSON.stringify(entry.completedItems),
      entry.id,
    ]
  );
}

export async function getProgressEntries(): Promise<ProgressEntry[]> {
  const database = await getDb();
  const rows = await database.getAllAsync<{
    id: number;
    date: string;
    pain_level: number;
    symptoms: string;
    notes: string;
    completed_items: string;
    created_at: string;
  }>('SELECT * FROM progress_entries ORDER BY date DESC');

  return rows.map((row) => ({
    id: row.id,
    date: row.date,
    painLevel: row.pain_level,
    symptoms: JSON.parse(row.symptoms),
    notes: row.notes,
    completedItems: JSON.parse(row.completed_items),
    createdAt: row.created_at,
  }));
}

export async function getEntryForDate(date: string): Promise<ProgressEntry | null> {
  const database = await getDb();
  const row = await database.getFirstAsync<{
    id: number;
    date: string;
    pain_level: number;
    symptoms: string;
    notes: string;
    completed_items: string;
    created_at: string;
  }>('SELECT * FROM progress_entries WHERE date = ? ORDER BY id DESC LIMIT 1', [date]);

  if (!row) return null;
  return {
    id: row.id,
    date: row.date,
    painLevel: row.pain_level,
    symptoms: JSON.parse(row.symptoms),
    notes: row.notes,
    completedItems: JSON.parse(row.completed_items),
    createdAt: row.created_at,
  };
}

// ── Saved Symptoms ───────────────────────────────────────────────────────────

export async function saveUserSymptoms(symptomIds: string[]): Promise<void> {
  const database = await getDb();
  await database.withTransactionAsync(async () => {
    await database.runAsync('DELETE FROM user_symptoms');
    await database.runAsync(
      "INSERT INTO user_symptoms (symptom_ids, saved_at) VALUES (?, datetime('now'))",
      [JSON.stringify(symptomIds)]
    );
  });
}

export async function loadUserSymptoms(): Promise<SavedSymptoms | null> {
  const database = await getDb();
  const row = await database.getFirstAsync<{ symptom_ids: string; saved_at: string }>(
    'SELECT * FROM user_symptoms ORDER BY id DESC LIMIT 1'
  );
  if (!row) return null;
  return {
    symptomIds: JSON.parse(row.symptom_ids),
    savedAt: row.saved_at,
  };
}
