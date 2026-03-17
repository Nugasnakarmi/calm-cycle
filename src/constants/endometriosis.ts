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

// Maps each symptom to the most relevant plan item texts.
// Using item strings (not array indices) so reordering items never silently changes the plan.
export const SYMPTOM_PLAN_MAP: Record<
  string,
  { diet: string[]; exercise: string[]; yoga: string[]; lifestyle: string[] }
> = {
  'pelvic-pain': {
    diet: [
      'Eat plenty of fruits and vegetables (especially leafy greens)',
      'Include omega-3 rich foods: salmon, sardines, mackerel',
      'Limit red and processed meats',
      'Reduce sugar and highly processed foods',
    ],
    exercise: [
      'Walking: 20-30 minutes daily at a comfortable pace',
      'Light stretching: Focus on hip and pelvic area',
      'Listen to your body and rest on difficult days',
    ],
    yoga: [
      "Child's Pose (Balasana): Gentle hip and lower back stretch",
      'Reclining Bound Angle Pose (Supta Baddha Konasana)',
      'Supine Twist: Gentle spinal rotation',
      'Deep breathing exercises: 5-10 minutes daily',
    ],
    lifestyle: [
      'Use heat therapy: heating pad or warm bath for pain relief',
      'Practice stress management techniques',
    ],
  },
  'painful-periods': {
    diet: [
      'Eat plenty of fruits and vegetables (especially leafy greens)',
      'Include omega-3 rich foods: salmon, sardines, mackerel',
      'Limit red and processed meats',
      'Reduce sugar and highly processed foods',
      'Limit alcohol and caffeine consumption',
    ],
    exercise: [
      'Walking: 20-30 minutes daily at a comfortable pace',
      'Light stretching: Focus on hip and pelvic area',
      'Listen to your body and rest on difficult days',
      'Aim for consistent, moderate activity over intense workouts',
    ],
    yoga: [
      "Child's Pose (Balasana): Gentle hip and lower back stretch",
      'Reclining Bound Angle Pose (Supta Baddha Konasana)',
      'Legs-Up-The-Wall Pose (Viparita Karani)',
      'Deep breathing exercises: 5-10 minutes daily',
    ],
    lifestyle: [
      'Use heat therapy: heating pad or warm bath for pain relief',
      'Practice stress management techniques',
      'Prioritize self-care and rest when needed',
    ],
  },
  'heavy-bleeding': {
    diet: [
      'Eat plenty of fruits and vegetables (especially leafy greens)',
      'Choose whole grains over refined carbohydrates',
      'Limit red and processed meats',
      'Stay well hydrated with water throughout the day',
    ],
    exercise: [
      'Walking: 20-30 minutes daily at a comfortable pace',
      'Listen to your body and rest on difficult days',
      'Aim for consistent, moderate activity over intense workouts',
    ],
    yoga: [
      'Legs-Up-The-Wall Pose (Viparita Karani)',
      'Deep breathing exercises: 5-10 minutes daily',
      'Meditation: Mindfulness for pain management',
    ],
    lifestyle: [
      'Use heat therapy: heating pad or warm bath for pain relief',
      'Maintain a regular sleep schedule (7-9 hours)',
      'Prioritize self-care and rest when needed',
      'Communicate openly with your healthcare provider',
    ],
  },
  'pain-intercourse': {
    diet: [
      'Eat plenty of fruits and vegetables (especially leafy greens)',
      'Include omega-3 rich foods: salmon, sardines, mackerel',
      'Limit red and processed meats',
    ],
    exercise: [
      'Light stretching: Focus on hip and pelvic area',
      'Listen to your body and rest on difficult days',
    ],
    yoga: [
      "Child's Pose (Balasana): Gentle hip and lower back stretch",
      'Reclining Bound Angle Pose (Supta Baddha Konasana)',
      'Supine Twist: Gentle spinal rotation',
      'Deep breathing exercises: 5-10 minutes daily',
      'Progressive muscle relaxation',
    ],
    lifestyle: [
      'Use heat therapy: heating pad or warm bath for pain relief',
      'Practice stress management techniques',
      'Join support groups or seek counseling if needed',
      'Communicate openly with your healthcare provider',
    ],
  },
  'bowel-pain': {
    diet: [
      'Eat plenty of fruits and vegetables (especially leafy greens)',
      'Choose whole grains over refined carbohydrates',
      'Consider reducing dairy and gluten if sensitive',
      'Limit alcohol and caffeine consumption',
      'Stay well hydrated with water throughout the day',
    ],
    exercise: [
      'Walking: 20-30 minutes daily at a comfortable pace',
      'Listen to your body and rest on difficult days',
      'Aim for consistent, moderate activity over intense workouts',
    ],
    yoga: [
      "Child's Pose (Balasana): Gentle hip and lower back stretch",
      'Legs-Up-The-Wall Pose (Viparita Karani)',
      'Supine Twist: Gentle spinal rotation',
      'Deep breathing exercises: 5-10 minutes daily',
    ],
    lifestyle: [
      'Use heat therapy: heating pad or warm bath for pain relief',
      'Track your symptoms to identify patterns',
      'Practice stress management techniques',
    ],
  },
  'urination-pain': {
    diet: [
      'Limit alcohol and caffeine consumption',
      'Stay well hydrated with water throughout the day',
    ],
    exercise: [
      'Walking: 20-30 minutes daily at a comfortable pace',
      'Listen to your body and rest on difficult days',
    ],
    yoga: [
      'Legs-Up-The-Wall Pose (Viparita Karani)',
      'Deep breathing exercises: 5-10 minutes daily',
    ],
    lifestyle: [
      'Use heat therapy: heating pad or warm bath for pain relief',
      'Practice stress management techniques',
      'Communicate openly with your healthcare provider',
    ],
  },
  fatigue: {
    diet: [
      'Eat plenty of fruits and vegetables (especially leafy greens)',
      'Include omega-3 rich foods: salmon, sardines, mackerel',
      'Choose whole grains over refined carbohydrates',
      'Add nuts and seeds (flaxseed, walnuts) for healthy fats',
      'Stay well hydrated with water throughout the day',
    ],
    exercise: [
      'Walking: 20-30 minutes daily at a comfortable pace',
      'Listen to your body and rest on difficult days',
      'Aim for consistent, moderate activity over intense workouts',
      'Gradually increase duration and intensity',
    ],
    yoga: [
      'Deep breathing exercises: 5-10 minutes daily',
      'Meditation: Mindfulness for pain management',
      'Progressive muscle relaxation',
    ],
    lifestyle: [
      'Maintain a regular sleep schedule (7-9 hours)',
      'Practice stress management techniques',
      'Consider acupuncture or massage therapy',
      'Prioritize self-care and rest when needed',
    ],
  },
  bloating: {
    diet: [
      'Eat plenty of fruits and vegetables (especially leafy greens)',
      'Choose whole grains over refined carbohydrates',
      'Reduce sugar and highly processed foods',
      'Consider reducing dairy and gluten if sensitive',
      'Limit alcohol and caffeine consumption',
      'Stay well hydrated with water throughout the day',
    ],
    exercise: [
      'Walking: 20-30 minutes daily at a comfortable pace',
      'Light stretching: Focus on hip and pelvic area',
      'Listen to your body and rest on difficult days',
    ],
    yoga: [
      "Child's Pose (Balasana): Gentle hip and lower back stretch",
      'Cat-Cow Pose (Marjaryasana-Bitilasana): Spinal flexibility',
      'Supine Twist: Gentle spinal rotation',
      'Deep breathing exercises: 5-10 minutes daily',
    ],
    lifestyle: [
      'Use heat therapy: heating pad or warm bath for pain relief',
      'Practice stress management techniques',
      'Prioritize self-care and rest when needed',
    ],
  },
  nausea: {
    diet: [
      'Eat plenty of fruits and vegetables (especially leafy greens)',
      'Choose whole grains over refined carbohydrates',
      'Reduce sugar and highly processed foods',
      'Limit alcohol and caffeine consumption',
      'Stay well hydrated with water throughout the day',
    ],
    exercise: [
      'Walking: 20-30 minutes daily at a comfortable pace',
      'Listen to your body and rest on difficult days',
    ],
    yoga: [
      'Deep breathing exercises: 5-10 minutes daily',
      'Meditation: Mindfulness for pain management',
    ],
    lifestyle: [
      'Use heat therapy: heating pad or warm bath for pain relief',
      'Practice stress management techniques',
      'Prioritize self-care and rest when needed',
    ],
  },
  'back-pain': {
    diet: [
      'Eat plenty of fruits and vegetables (especially leafy greens)',
      'Include omega-3 rich foods: salmon, sardines, mackerel',
      'Limit red and processed meats',
    ],
    exercise: [
      'Walking: 20-30 minutes daily at a comfortable pace',
      'Light stretching: Focus on hip and pelvic area',
      'Pilates: Strengthens core without high impact',
      'Listen to your body and rest on difficult days',
    ],
    yoga: [
      "Child's Pose (Balasana): Gentle hip and lower back stretch",
      'Cat-Cow Pose (Marjaryasana-Bitilasana): Spinal flexibility',
      'Supine Twist: Gentle spinal rotation',
      'Deep breathing exercises: 5-10 minutes daily',
    ],
    lifestyle: [
      'Use heat therapy: heating pad or warm bath for pain relief',
      'Practice stress management techniques',
      'Consider acupuncture or massage therapy',
    ],
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

  const dietItems = new Set<string>();
  const exerciseItems = new Set<string>();
  const yogaItems = new Set<string>();
  const lifestyleItems = new Set<string>();

  selectedSymptomIds.forEach((id) => {
    const map = SYMPTOM_PLAN_MAP[id];
    if (!map) return;
    map.diet.forEach((s) => dietItems.add(s));
    map.exercise.forEach((s) => exerciseItems.add(s));
    map.yoga.forEach((s) => yogaItems.add(s));
    map.lifestyle.forEach((s) => lifestyleItems.add(s));
  });

  // Filter preserves the original ordering from the recommendation arrays
  const pick = (all: string[], keys: Set<string>) => all.filter((item) => keys.has(item));

  return [
    { ...DIET_RECOMMENDATIONS, items: pick(DIET_RECOMMENDATIONS.items, dietItems) },
    { ...EXERCISE_RECOMMENDATIONS, items: pick(EXERCISE_RECOMMENDATIONS.items, exerciseItems) },
    { ...YOGA_RECOMMENDATIONS, items: pick(YOGA_RECOMMENDATIONS.items, yogaItems) },
    { ...LIFESTYLE_RECOMMENDATIONS, items: pick(LIFESTYLE_RECOMMENDATIONS.items, lifestyleItems) },
  ].filter((r) => r.items.length > 0);
}
