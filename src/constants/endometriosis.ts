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

// Maps each symptom to the most relevant plan items (plan title → item indices)
export const SYMPTOM_PLAN_MAP: Record<
  string,
  { diet: number[]; exercise: number[]; yoga: number[]; lifestyle: number[] }
> = {
  'pelvic-pain': {
    diet: [0, 1, 5, 6],
    exercise: [0, 3, 5],
    yoga: [0, 1, 4, 5],
    lifestyle: [0, 3],
  },
  'painful-periods': {
    diet: [0, 1, 5, 6, 8],
    exercise: [0, 3, 5, 6],
    yoga: [0, 1, 2, 5],
    lifestyle: [0, 3, 6],
  },
  'heavy-bleeding': {
    diet: [0, 2, 5, 9],
    exercise: [0, 5, 6],
    yoga: [2, 5, 6],
    lifestyle: [0, 1, 6, 7],
  },
  'pain-intercourse': {
    diet: [0, 1, 5],
    exercise: [3, 5],
    yoga: [0, 1, 4, 5, 7],
    lifestyle: [0, 3, 5, 7],
  },
  'bowel-pain': {
    diet: [0, 2, 7, 8, 9],
    exercise: [0, 5, 6],
    yoga: [0, 2, 4, 5],
    lifestyle: [0, 2, 3],
  },
  'urination-pain': {
    diet: [8, 9],
    exercise: [0, 5],
    yoga: [2, 5],
    lifestyle: [0, 3, 7],
  },
  fatigue: {
    diet: [0, 1, 2, 3, 9],
    exercise: [0, 5, 6, 7],
    yoga: [5, 6, 7],
    lifestyle: [1, 3, 4, 6],
  },
  bloating: {
    diet: [0, 2, 6, 7, 8, 9],
    exercise: [0, 3, 5],
    yoga: [0, 3, 4, 5],
    lifestyle: [0, 3, 6],
  },
  nausea: {
    diet: [0, 2, 6, 8, 9],
    exercise: [0, 5],
    yoga: [5, 6],
    lifestyle: [0, 3, 6],
  },
  'back-pain': {
    diet: [0, 1, 5],
    exercise: [0, 3, 4, 5],
    yoga: [0, 3, 4, 5],
    lifestyle: [0, 3, 4],
  },
};

export function buildPersonalisedPlan(
  selectedSymptomIds: string[]
): ManagementRecommendation[] {
  if (!selectedSymptomIds.length) {
    return [
      DIET_RECOMMENDATIONS,
      EXERCISE_RECOMMENDATIONS,
      YOGA_RECOMMENDATIONS,
      LIFESTYLE_RECOMMENDATIONS,
    ];
  }

  const dietIndices = new Set<number>();
  const exerciseIndices = new Set<number>();
  const yogaIndices = new Set<number>();
  const lifestyleIndices = new Set<number>();

  selectedSymptomIds.forEach((id) => {
    const map = SYMPTOM_PLAN_MAP[id];
    if (!map) return;
    map.diet.forEach((i) => dietIndices.add(i));
    map.exercise.forEach((i) => exerciseIndices.add(i));
    map.yoga.forEach((i) => yogaIndices.add(i));
    map.lifestyle.forEach((i) => lifestyleIndices.add(i));
  });

  const pick = (all: string[], indices: Set<number>) =>
    Array.from(indices)
      .sort((a, b) => a - b)
      .map((i) => all[i])
      .filter(Boolean);

  return [
    { ...DIET_RECOMMENDATIONS, items: pick(DIET_RECOMMENDATIONS.items, dietIndices) },
    {
      ...EXERCISE_RECOMMENDATIONS,
      items: pick(EXERCISE_RECOMMENDATIONS.items, exerciseIndices),
    },
    { ...YOGA_RECOMMENDATIONS, items: pick(YOGA_RECOMMENDATIONS.items, yogaIndices) },
    {
      ...LIFESTYLE_RECOMMENDATIONS,
      items: pick(LIFESTYLE_RECOMMENDATIONS.items, lifestyleIndices),
    },
  ].filter((r) => r.items.length > 0);
}
