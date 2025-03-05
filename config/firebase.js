import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getReactNativePersistence } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCCqTkuzRrrQLs1WZJ4XcA96YrVfS9soUo",
  authDomain: "mycare-8f527.firebaseapp.com",
  projectId: "mycare-8f527",
  storageBucket: "mycare-8f527.firebasestorage.app",
  messagingSenderId: "297558599140",
  appId: "1:297558599140:web:4f55ef8b4feab977a853f1",
  measurementId: "G-VVBETQRYB5"
};

export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = getFirestore(app);
