# LAKSHYA 2026 Hackathon Website Setup

This is the complete React + Vite + TypeScript + Tailwind CSS project for the LAKSHYA 2026 hackathon.

## Prerequisites
- Node.js installed
- Firebase account for database and authentication

## Quick Start
1. Ensure your Node environment is clean. If you see `npm` cache errors, run `npm cache clean --force`.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY="your-api-key"
   VITE_FIREBASE_AUTH_DOMAIN="your-auth-domain"
   VITE_FIREBASE_PROJECT_ID="your-project-id"
   VITE_FIREBASE_STORAGE_BUCKET="your-storage-bucket"
   VITE_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
   VITE_FIREBASE_APP_ID="your-app-id"
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Admin Setup
To access the admin dashboard (`/admin/login`), you must first create a Firebase user via the Firebase Console:
1. Go to Firebase Console > Authentication.
2. Enable Email/Password authentication.
3. Click "Add User" and create an admin account (e.g., `admin@sjbit.edu.in`).
4. Log in using these credentials at `/admin/login`.

## Firebase Firestore Collections
The code expects a `registrations` collection for teams signing up. Ensure you configure Firestore Security Rules such that only authenticated admins can read all registrations, but unauthenticated users can create them.

Example Rule:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /registrations/{document=**} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
  }
}
```

Enjoy building Lakshya 2026!
