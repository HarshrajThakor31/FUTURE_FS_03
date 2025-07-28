import { initializeApp, getApps } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB02XGW-xrGohkM5yHPqqdhDLGI6Yb5Upk",
  authDomain: "starwars-legacy-evolved.firebaseapp.com",
  projectId: "starwars-legacy-evolved",
  storageBucket: "starwars-legacy-evolved.appspot.com",
  messagingSenderId: "483833233539",
  appId: "1:483833233539:web:82936b1c677168336a9bb6"
};

let app;
let db;

try {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  db = getFirestore(app);
} catch (error) {
  console.error('Firebase initialization error:', error);
  db = null;
}

export { db };