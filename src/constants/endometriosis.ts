import { Symptom, ManagementRecommendation } from '../types';

export const SYMPTOMS: Symptom[] = [
  {
    id: 'pelvic-pain',
    name: 'Pelvic Pain',
    description: 'Chronic or severe pain in the pelvic region',
    category: 'pain',
  },
  {
    id: 'painful-periods',
    name: 'Painful Periods',
    description: 'Severe menstrual cramps (dysmenorrhea)',
    category: 'menstrual',
  },
  {
    id: 'heavy-bleeding',
    name: 'Heavy Bleeding',
    description: 'Menorrhagia or irregular bleeding',
    category: 'menstrual',
  },
  {
    id: 'pain-intercourse',
    name: 'Pain During Intercourse',
    description: 'Dyspareunia - pain during or after sex',
    category: 'pain',
  },
  {
    id: 'bowel-pain',
    name: 'Bowel Pain',
    description: 'Pain during bowel movements',
    category: 'digestive',
  },
  {
    id: 'urination-pain',
    name: 'Painful Urination',
    description: 'Pain or discomfort when urinating',
    category: 'pain',
  },
  {
    id: 'fatigue',
    name: 'Fatigue',
    description: 'Persistent tiredness and low energy',
    category: 'other',
  },
  {
    id: 'bloating',
    name: 'Bloating',
    description: 'Abdominal bloating and discomfort',
    category: 'digestive',
  },
  {
    id: 'nausea',
    name: 'Nausea',
    description: 'Feeling sick or queasy',
    category: 'digestive',
  },
  {
    id: 'back-pain',
    name: 'Lower Back Pain',
    description: 'Persistent aches in the lower back',
    category: 'pain',
  },
];

export const DIET_RECOMMENDATIONS: ManagementRecommendation = {
  title: 'Nutrition Plan',
  description: 'Anti-inflammatory foods to help manage symptoms',
  icon: '🥗',
  items: [
    'Eat plenty of fruits and vegetables (especially leafy greens)',
    'Include omega-3 rich foods: salmon, sardines, mackerel',
    'Choose whole grains over refined carbohydrates',
    'Add nuts and seeds (flaxseed, walnuts) for healthy fats',
    'Use olive oil as your primary cooking oil',
    'Limit red and processed meats',
    'Reduce sugar and highly processed foods',
    'Consider reducing dairy and gluten if sensitive',
    'Limit alcohol and caffeine consumption',
    'Stay well hydrated with water throughout the day',
  ],
};

export const EXERCISE_RECOMMENDATIONS: ManagementRecommendation = {
  title: 'Exercise Plan',
  description: 'Low-impact activities to reduce pain and improve well-being',
  icon: '🏃‍♀️',
  items: [
    'Walking: 20-30 minutes daily at a comfortable pace',
    'Swimming: Gentle, full-body exercise with low impact',
    'Cycling: Either outdoor or stationary bike',
    'Light stretching: Focus on hip and pelvic area',
    'Pilates: Strengthens core without high impact',
    'Listen to your body and rest on difficult days',
    'Aim for consistent, moderate activity over intense workouts',
    'Gradually increase duration and intensity',
  ],
};

export const YOGA_RECOMMENDATIONS: ManagementRecommendation = {
  title: 'Yoga & Mindfulness',
  description: 'Gentle poses and practices to ease discomfort',
  icon: '🧘‍♀️',
  items: [
    "Child's Pose (Balasana): Gentle hip and lower back stretch",
    'Reclining Bound Angle Pose (Supta Baddha Konasana)',
    'Legs-Up-The-Wall Pose (Viparita Karani)',
    'Cat-Cow Pose (Marjaryasana-Bitilasana): Spinal flexibility',
    'Supine Twist: Gentle spinal rotation',
    'Deep breathing exercises: 5-10 minutes daily',
    'Meditation: Mindfulness for pain management',
    'Progressive muscle relaxation',
  ],
};

export const LIFESTYLE_RECOMMENDATIONS: ManagementRecommendation = {
  title: 'Lifestyle Tips',
  description: 'Daily habits to support your well-being',
  icon: '✨',
  items: [
    'Use heat therapy: heating pad or warm bath for pain relief',
    'Maintain a regular sleep schedule (7-9 hours)',
    'Track your symptoms to identify patterns',
    'Practice stress management techniques',
    'Consider acupuncture or massage therapy',
    'Join support groups or seek counseling if needed',
    'Prioritize self-care and rest when needed',
    'Communicate openly with your healthcare provider',
  ],
};
