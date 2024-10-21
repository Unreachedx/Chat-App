import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBMmOqs30ueT8T2T7ICzU2RPuWnkbq61WM",
  authDomain: "chat-app-database-a5f66.firebaseapp.com",
  projectId: "chat-app-database-a5f66",
  storageBucket: "chat-app-database-a5f66.appspot.com",
  messagingSenderId: "661430197367",
  appId: "1:661430197367:web:26013cf506dd7888a53a72",
  measurementId: "G-B0S3BY8681"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Initialize Firestore
const db = getFirestore(app);

// Export the initialized app, auth, and db
export { app, auth, db };
