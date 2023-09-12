// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from "@firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD08sKugzb_ZDnjYYkZiZ0rSYHcWCDU5pQ",
  authDomain: "triply-c4bc1.firebaseapp.com",
  projectId: "triply-c4bc1",
  storageBucket: "triply-c4bc1.appspot.com",
  messagingSenderId: "178040755181",
  appId: "1:178040755181:web:4f16285a800375ad11cde4"
};

// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
export const FBDB = getFirestore(app)
export const FBSTORAGE = getStorage(app);
export const FBAUTH = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

