# Your Day Diary — Serverless Social Media Diary App

A full-featured social media diary application built entirely **serverless with Firebase**.

- **Zero Server Management**: No Node.js server, no Render sleep timeouts, no wake-up delays.
- **Never Expires**: Runs on Google Firebase Spark plan (100% Free Forever) with Cloud Firestore and Firebase Authentication.
- **Real-Time Everything**: Live diary feed, instant direct messaging, group chats, typing indicators, online presence, and WebRTC audio/video calls.

---

## Features

- **Authentication**: Email/Password registration & login with support for unique `@username` ID handles.
- **Diary Feed**: Rich diary entries with text and photo uploads.
- **Interactions**: Real-time Likes, Comments, and Shares.
- **Profiles**: Customizable profile photo, display name, bio, follower & following counts, and personal entry timeline.
- **Follow & Block**: Follow friends or block unwanted accounts.
- **Search**: Search users by `@username` or display name.
- **Real-Time Chat (DMs)**: Instant 1-on-1 private messaging with unread badges and typing indicators powered by Firestore `onSnapshot`.
- **Group Chats**: Create groups, add multiple members, and chat in real time.
- **Voice & Video Calling**: Peer-to-peer WebRTC calls with Firestore real-time signaling.
- **Presence**: Green dot online/offline status updated dynamically.
- **Settings**: 10 customizable toggles (Privacy, Notifications, Dark mode, Language, etc.).

---

## Quick Setup (Under 3 Minutes)

### 1. Create a Free Firebase Project
1. Go to the [Firebase Console](https://console.firebase.google.com/) and click **Add project**.
2. Give your project a name (e.g. `your-day-diary`) and complete setup.

### 2. Enable Authentication
1. In your Firebase Console, navigate to **Build** → **Authentication**.
2. Click **Get Started**, choose **Email/Password**, and enable it.

### 3. Enable Cloud Firestore
1. In your Firebase Console, navigate to **Build** → **Firestore Database**.
2. Click **Create database**, choose a region close to you, and start in **Production mode** (or Test mode).
3. Under the **Rules** tab in Firestore, copy and paste the contents of `firestore.rules` and click **Publish**.

### 4. Connect Your App
1. Go to **Project Settings** (gear icon) → **General**.
2. Scroll to **Your apps**, click the **Web icon (`</>`)**, and register your app (e.g., `your-day-diary`).
3. Copy the `firebaseConfig` object and paste it into `firebase-config.js`:
   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "your-project-id.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project-id.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abcdef"
   };
   ```
   *(Alternatively, just open the app in your browser and paste your config directly into the setup screen!)*

---

## How to Run & Test Locally

You do not need to install any heavy packages or run any backend servers!

Simply open `index.html` (or `public/index.html`) directly in your browser, or run a simple local web server:
```bash
# Option A: Python
python -m http.server 3000

# Option B: Node npx serve
npx serve public
```
Then visit `http://localhost:3000`. Open two different browsers (or an incognito window) to test real-time chat, calls, and follow interactions between two accounts.

---

## Deploy Live (Free Forever & Never Expires)

### Option 1: Firebase Hosting (Recommended)
1. Install the Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```
2. Log in and initialize:
   ```bash
   firebase login
   firebase init hosting
   ```
   - Select your existing Firebase project.
   - Specify `public` as your public directory.
   - Configure as a single-page app: `Yes`.
3. Deploy:
   ```bash
   firebase deploy
   ```
Your app is now live at `https://your-project-id.web.app` with global CDN and SSL!

### Option 2: GitHub Pages
1. Push your repository to GitHub.
2. In your GitHub repo, go to **Settings** → **Pages**.
3. Under **Branch**, select `main` and root `/`, then click **Save**.
4. Your diary is instantly live with custom GitHub URL.

### Option 3: Vercel or Netlify
Simply import your GitHub repository into [Vercel](https://vercel.com) or [Netlify](https://netlify.com) as a static site and click **Deploy**.

---

## Packaging as an Android APK (Mobile App)

The app is fully PWA-ready with `manifest.json` and `sw.js` (Service Worker) configured with standalone orientation, splash screens, and offline caching.

### Method 1: PWABuilder (Fastest, No Coding Needed)
1. Deploy your app to Firebase Hosting (or Vercel / GitHub Pages) so you have an `https://` URL.
2. Visit [PWABuilder.com](https://www.pwabuilder.com/).
3. Enter your live URL and click **Start**.
4. Click **Package for Android (APK / AAB)** and download your signed Android APK ready to install on your phone!

### Method 2: WebIntoApp (Direct APK Builder)
1. Visit [WebIntoApp.com](https://www.webintoapp.com/).
2. Paste your live app link, set App Name to **Your Day Diary**, and choose the app icon.
3. Click **Make App** to download the ready-to-install `.apk` directly.

### Method 3: Capacitor / Cordova CLI
```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init "Your Day Diary" "com.yourday.diary" --web-dir=public
npx cap add android
npx cap open android
```
Build and run directly in Android Studio to export your production APK.

---

## Mobile WhatsApp-Style Push Notifications

1. Open the app on your phone and go to **Settings (⚙)**.
2. Tap **Enable Push** under **Mobile & WhatsApp-Style Alerts**.
3. Accept the browser/device permission prompt.
4. When someone sends you a direct message or initiates a call while your screen is off or in background:
   - Double vibration pulse (`[200, 100, 200]`)
   - WhatsApp two-tone audio chime synthesized via Web Audio API
   - System heads-up banner showing sender name, avatar, and message snippet
   - Tapping the banner instantly opens the app directly into that user's chat!