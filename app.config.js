import 'dotenv/config';

export default{
  "expo": {
    "name": "Chat-App",
    "slug": "Chat-App",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "myapp",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      }
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router",
      [
        "expo-splash-screen",
        {
          "image": "./assets/images/splash-icon.png",
          "imageWidth": 200,
          "resizeMode": "contain",
          "backgroundColor": "#ffffff"
        }
      ]
    ],
    "experiments": {
      "typedRoutes": true
    },
    "extra": {
      "router": {
        "origin": false
      },
      "apiKey": process.env.EXPO_PUBLIC_API_KEY,
      "authDomain": process.env.EXPO_PUBLIC_AUTH_DOMAIN,
      "projectId": process.env.EXPO_PUBLIC_PROJECT_ID,
      "storageBucket": process.env.EXPO_PUBLIC_STORAGE_BUCKET,
      "messagingSenderId": process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
      "appId": process.env.EXPO_PUBLIC_APP_ID,
      "measurementId": process.env.EXPO_PUBLIC_MEASUREMENT_ID,
      "eas": {
        "projectId": process.env.EXPO_PUBLIC_EAS_PROJECT_ID
      }
    }
  }
}
