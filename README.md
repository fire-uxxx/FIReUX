# FIReMVP

FIReMVP is built with Nuxt3, Firebase, Vuefire, and Stripe integrations to provide a robust foundation for your applications. It leverages Nuxt 3 and Tailwind CSS for rapid UI development, Firebase for authentication and data storage, and Stripe for payment processing.

## Features

- **Nuxt 3 & Tailwind CSS:** Modern UI development with a robust, responsive design system.
- **Firebase Integration:** Authentication and Firestore access via Firebase and Vuefire.
- **Stripe Integration:** Manage payments and tips using Stripe.
- **Code Quality:** Configured with ESLint and Prettier for a consistent coding style.

## Prerequisites

- Node.js v14 or later
- npm
- A Firebase project with a service account for the Firebase Admin SDK
- A Stripe account with API keys

## Setup

### Environment Variables

Create a `.env` file in the project root with the following contents (replace the placeholder values with your actual credentials):

```env
# Firebase Admin Credentials
# IMPORTANT: Use the real (absolute) path for the service account file.
# You can obtain the real path by running:
#    realpath config/service-account.json
GOOGLE_APPLICATION_CREDENTIALS=/absolute/path/to/your/project/config/service-account.json

# Firebase Configuration
FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
FIREBASE_APP_ID=YOUR_FIREBASE_APP_ID
FIREBASE_MEASUREMENT_ID=YOUR_FIREBASE_MEASUREMENT_ID

# Stripe Keys
STRIPE_PUBLISHABLE_KEY=YOUR_STRIPE_PUBLISHABLE_KEY
STRIPE_SECRET_KEY=YOUR_STRIPE_SECRET_KEY

# Node Environment
NODE_ENV=development