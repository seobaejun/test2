import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyDrhI9EXoGAx-tNjDqVigXpVvTo7QHrc4c",
  authDomain: "website-b80b1.firebaseapp.com",
  projectId: "website-b80b1",
  storageBucket: "website-b80b1.firebasestorage.app",
  messagingSenderId: "1007397131463",
  appId: "1:1007397131463:web:34eafc61b65464dec21ae2",
  measurementId: "G-W2BR06K2F8",
};

// Firebase 앱 초기화
let app;
let auth;
let db;
let storage;
let analytics;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
  analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
} catch (error) {
  console.error("Firebase 초기화 실패:", error);
  // Firebase 초기화 실패 시 null로 설정
  app = null;
  auth = null;
  db = null;
  storage = null;
  analytics = null;
}

export { auth, db, storage, analytics };
export default app;
