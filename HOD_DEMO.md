# LAKSHYA 2026 - HOD Demonstration Guide

## Welcome & Introduction (1 min)
- **Action:** Open the home page (`https://lakshya2026.web.app/`).
- **Talking Points:**
  - "Welcome to the official platform for LAKSHYA 2026, our department's 24-hour national-level hackathon."
  - "The UI was overhauled to remove heavy loading screens (like the initial 4MB video which caused lagging and duplicate rendering issues), focusing on immediate access to information."
  - "The design uses a clean, professional, academic-friendly aesthetic, maintaining high performance and accessibility."

## Core Functionality - Registration (2 mins)
- **Action:** Click on "Register Now" from the Navbar or Home page.
- **Talking Points:**
  - "The primary business goal of this portal is team registration. We have officially enabled the live registration flow."
  - "Notice the multi-step registration form. It collects comprehensive data: Team Details, Leader Details, and Member Details."
  - "It includes validation to ensure clean data is securely transmitted to our Firebase backend."
  - *(Optional)* Fill out the form quickly and submit it to show the Success screen and Registration ID.

## Architecture & Security (1 min)
- **Talking Points:**
  - "Built with React, TypeScript, and Vite for blazing-fast performance."
  - "The backend is powered by Firebase. We've implemented strict Firestore Security Rules to ensure that while public users can submit registrations, only authenticated administrators can read or modify sensitive data."
  - "Environment variables are handled securely to prevent key leakage in the repository."

## Admin Capabilities (1 min)
- **Action:** Navigate to the `/admin/login` route.
- **Talking Points:**
  - "We have a dedicated, protected Admin Dashboard for organizers to manage registrations, enquiries, and site content."
  - "Authentication is fully integrated, meaning unauthorized users are redirected away."

## Conclusion
- "The codebase is clean, well-commented, and ready for production scaling as we approach November 2026. Thank you for your time."
