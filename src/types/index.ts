export interface Symptom {
  id: string;
  name: string;
  description: string;
  category: 'pain' | 'digestive' | 'menstrual' | 'other';
}

export interface ManagementRecommendation {
  title: string;
  description: string;
  items: string[];
  icon: string;
}

export interface ProgressEntry {
  id?: number;
  date: string;
  painLevel: number;
  symptoms: string[];
  notes: string;
  completedItems: string[];
  createdAt?: string;
}

export interface SavedSymptoms {
  symptomIds: string[];
  savedAt: string;
}
