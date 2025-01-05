import 'dotenv/config';

export default {
  expo: {
    name: "Chat-App",
    slug: "Chat-App",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff"
      }
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png"
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff"
        }
      ]
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      apiKey: process.env.EXPO_PUBLIC_API_KEY || null,
      authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN || null,
      projectId: process.env.EXPO_PUBLIC_PROJECT_ID || null,
      storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET || null,
      messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID || null,
      appId: process.env.EXPO_PUBLIC_APP_ID || null,
      measurementId: process.env.EXPO_PUBLIC_MEASUREMENT_ID || null,
      easProjectId: process.env.EXPO_PUBLIC_EAS_PROJECT_ID || null
    }
  }
};
