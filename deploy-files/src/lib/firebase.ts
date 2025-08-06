"use client";

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBIF9wqmqtbgl0HGjo49STcgRsWJO8Lvk4",
  authDomain: "lifehorizonit.firebaseapp.com",
  projectId: "lifehorizonit",
  storageBucket: "lifehorizonit.firebasestorage.app",
  messagingSenderId: "235190753778",
  appId: "1:235190753778:web:5fc9bbb088d41bbcfcf36b",
  measurementId: "G-MX8FYTMD4C"
};

// التحقق من عدم وجود تهيئة سابقة
let app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// تهيئة Firestore
const db = getFirestore(app);

// تهيئة Analytics فقط في المتصفح
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

// طباعة معلومات التكوين للتأكد من صحة البيانات
if (process.env.NODE_ENV === 'development') {
  console.log('Firebase تم تهيئة');
  console.log('Project ID:', firebaseConfig.projectId);
}

export { db, analytics }; 