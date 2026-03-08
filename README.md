# Calm Cycle 🌸

A beautiful, cross-platform React Native app designed to help women manage endometriosis symptoms through personalized diet, exercise, and lifestyle recommendations.

## About Endometriosis

Endometriosis is a condition where tissue similar to the lining of the uterus grows outside the uterus. It affects approximately 1 in 10 women of reproductive age. Common symptoms include pelvic pain, painful periods, pain during intercourse, digestive issues, and fatigue.

## Features

- **Home Screen**: Welcome interface with information about endometriosis
- **Symptom Tracker**: Interactive symptom selection organized by category:
  - Pain Symptoms
  - Menstrual Symptoms
  - Digestive Symptoms
  - Other Symptoms
- **Personalized Management Plans**: Evidence-based recommendations for:
  - 🥗 Nutrition (Anti-inflammatory diet)
  - 🏃‍♀️ Exercise (Low-impact activities)
  - 🧘‍♀️ Yoga & Mindfulness
  - ✨ Lifestyle Tips

## Technology Stack

- **React Native** with **Expo** for cross-platform development
- **TypeScript** for type safety
- **React Navigation** for seamless screen transitions
- Supports **iOS**, **Android**, and **Web**

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
npm install --legacy-peer-deps
```

### Running the App

```bash
# Start on Web
npm run web

# Start on iOS
npm run ios

# Start on Android
npm run android

# Start Expo Dev Server
npm start
```

## Project Structure

```
calm-cycle/
├── src/
│   ├── screens/
│   │   ├── HomeScreen.tsx
│   │   ├── SymptomTrackerScreen.tsx
│   │   └── ManagementPlanScreen.tsx
│   ├── types/
│   │   └── index.ts
│   └── constants/
│       └── endometriosis.ts
├── App.tsx
└── package.json
```

## Design Philosophy

The app uses a calming teal/mint color palette that is:
- Professional and trustworthy
- Soothing and non-threatening
- Appropriate for a health and wellness application
- Accessible with good contrast ratios

## Medical Disclaimer

This app provides general information and guidance only. Always consult with your healthcare provider before making significant changes to your diet, exercise routine, or treatment plan. The recommendations in this app are not a substitute for professional medical advice.

## License

0BSD

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
