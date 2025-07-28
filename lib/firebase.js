// lib/firebase.js

// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
// This next line is the one that fulfills the "TODO" from your snippet.
// We are adding the SDK for the Firestore Database product.
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration is read securely from the .env.local file
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
// We add a check to see if the app is already initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firestore and export it for use in other parts of our app
const db = getFirestore(app);

export { db };