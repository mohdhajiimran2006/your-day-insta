// ============================================================
// Firebase Configuration for Your Day Diary
//
// 1. Go to https://console.firebase.google.com
// 2. Create a project (or select an existing one)
// 3. Add a Web App (</>) and copy the `firebaseConfig` object
// 4. Paste your keys below:
// ============================================================

const firebaseConfig = {
  apiKey: "AIzaSyCnGqwtorfYKCUEfQJvgodl_sYQwhApWTg",
  authDomain: "your-day-dairy.firebaseapp.com",
  projectId: "your-day-dairy",
  storageBucket: "your-day-dairy.firebasestorage.app",
  messagingSenderId: "123475887106",
  appId: "1:123475887106:web:f317b8cba4914b69da931b",
  measurementId: "G-78QNP3F8X2"
};

// Expose globally
if (typeof window !== 'undefined') {
  window.firebaseConfig = firebaseConfig;
}
