# LAKSHYA 2026 - Premium College Fest Platform

## Project Overview
LAKSHYA 2026 is a 24-hour national-level hackathon organized by the Department of Information Science and Engineering at SJB Institute of Technology. This web platform serves as the primary digital touchpoint for participants, organizers, and sponsors. It facilitates event discovery, team registration, and backend administration in a fast, secure, and visually distinctive environment.

## Core Features
- **Modern User Experience**: A fast, responsive UI featuring dynamic animations and a polished academic aesthetic.
- **Team Registration Flow**: A multi-step, validated form capturing team, leader, and member details with unique ID generation.
- **Organizer Dashboard**: A secure, protected `/admin` route for organizers to review registrations, update statuses (Qualified/Disqualified), and monitor enquiries.
- **Real-time Data Architecture**: Full integration with Firebase Firestore for live registration capture and status syncing.

## Technology Stack
- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Framer Motion
- **Routing**: React Router DOM v6
- **Backend & Database**: Firebase (Authentication, Firestore, Hosting)
- **State Management & Forms**: React Hooks, React Hot Toast

## Application Architecture
The application follows a standard SPA (Single Page Application) pattern with Vite. 
- `/src/pages`: Contains all public-facing pages (Home, About, Register, etc.).
- `/src/pages/admin`: Contains protected administrative views.
- `/src/components`: Reusable UI components (Navbar, Layout, etc.).
- `/src/lib`: Core utilities and Firebase initialization.

Firebase acts as the BaaS (Backend as a Service). Firestore is protected by security rules ensuring only authenticated admins can read or update the `registrations` collection, while public users can only append to it.

## Installation and Local Setup
1. Clone the repository: `git clone <repo-url>`
2. Install dependencies: `npm install`
3. Set up environment variables (see below).
4. Run the development server: `npm run dev`

## Environment Configuration
Create a `.env` file in the root directory and populate it with your Firebase configuration. **Do not commit real credentials.**

```env
VITE_FIREBASE_API_KEY="your-api-key"
VITE_FIREBASE_AUTH_DOMAIN="your-auth-domain"
VITE_FIREBASE_PROJECT_ID="your-project-id"
VITE_FIREBASE_STORAGE_BUCKET="your-storage-bucket"
VITE_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
VITE_FIREBASE_APP_ID="your-app-id"
```

## Firebase Setup and Security Notes
- **Authentication**: Enable Email/Password authentication for Admin access.
- **Firestore**: Create collections for `registrations` and `announcements`.
- **Security**: The `firestore.rules` file enforces least-privilege access. Public creation is permitted for registrations, but read/update/delete operations are restricted to `request.auth != null`.

## Build and Deployment
To build for production:
```bash
npm run build
```

To deploy to Firebase Hosting:
```bash
firebase deploy --only hosting
```

## Known Limitations and Future Enhancements
- **Bot Protection**: Consider adding AppCheck or reCAPTCHA to the registration endpoint to prevent automated spam.
- **Content Blocks**: Some secondary pages (Sponsors, Themes) require dynamic CMS integration for easier updates by non-technical staff.
- **Email Confirmation**: Integration with Firebase Extensions (Trigger Email) is planned to send automatic receipts to registered teams.

## Team
Developed by the LAKSHYA 2026 technical team.
