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
