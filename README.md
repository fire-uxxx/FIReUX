
FIReMVP

FIReMVP is built with Nuxt3, Firebase, Vuefire, and Stripe integrations to provide a robust foundation for your applications. It leverages Nuxt 3 and Tailwind CSS for rapid UI development, Firebase for authentication and data storage, and Stripe for payment processing.

Features
	•	Nuxt 3 & Tailwind CSS: Modern UI development with a robust, responsive design system.
	•	Firebase Integration: Authentication and Firestore access via Firebase and Vuefire.
	•	Stripe Integration: Manage payments and tips using Stripe.
	•	Code Quality: Configured with ESLint and Prettier for a consistent coding style.

Prerequisites
	•	Node.js v14 or later
	•	npm
	•	A Firebase project with a service account for the Firebase Admin SDK
	•	A Stripe account with API keys

Setup

1. Clone the Repository

git clone https://github.com/fire-uxxx/fire-mvp.git
cd fire-mvp

2. Install Dependencies

npm install

3. Configure Environment Variables

Create a .env file in the project root with the following contents (replace the placeholder values with your actual credentials):

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

# Node Environment & Frontend URL
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

4. Firebase Service Account
	•	Ensure the file config/service-account.json exists and is correctly formatted.

5. Firebase Hosting & Project Configuration

Update the following files:
	•	firebase.json
Replace placeholders with your project details:

{
  "functions": { "source": ".output/server" },
  "hosting": [
    {
      "site": "todo-my-site",
      "public": ".output/public",
      "cleanUrls": true,
      "ignore": [
        "firebase.json",
        "**/.*",
        "**/node_modules/**"
      ],
      "rewrites": [
        { "source": "**", "function": "server" }
      ]
    }
  ]
}


	•	.firebaserc
Set your default project:

{
  "projects": {
    "default": "todo-my-project"
  }
}



6. Project Metadata Update
	•	In package.json, update the "name" field:

"name": "todo-my-name"



7. Update Nuxt PWA Manifest
	•	In nuxt.config.js, update the PWA manifest section:

pwa: {
  registerType: 'autoUpdate',
  manifest: {
    name: 'todo-my-name',
    short_name: 'todo-my-name-short',
    start_url: '/',
    display: 'standalone',
    theme_color: '#6C5CE7',
    background_color: '#ffffff',
    icons: [
      { src: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512x512.png', sizes: '512x512', type: 'image/png' }
    ]
  },
  workbox: {
    navigateFallback: '/',
    cleanupOutdatedCaches: true,
    clientsClaim: true,
    skipWaiting: true
  },
  devOptions: {
    enabled: false
  }
}



8. Run the Development Server

npm run dev

Open http://localhost:3000 in your browser to test the app.

9. Build & Deploy (Firebase)
	•	Build the Application:

npm run build -- --preset=firebase


	•	Deploy to Firebase:

firebase deploy --only functions,hosting



10. Review Logs & Debug
	•	For Firebase Functions logs:

firebase functions:log --only server



Job List Checklist
	•	Clone the repository and install dependencies.
	•	Create and configure the .env file with Firebase and Stripe credentials.
	•	Ensure config/service-account.json is present.
	•	Update firebase.json with:
	•	"site": "todo-my-site"
	•	Rewrites to direct all requests to your function.
	•	Update .firebaserc with:

{
  "projects": {
    "default": "todo-my-project"
  }
}


	•	Update package.json with the project name:

"name": "todo-my-name"


	•	Update the PWA manifest in nuxt.config.js with:
	•	"name": "todo-my-name"
	•	"short_name": "todo-my-name-short"
	•	Run the development server and test the app.
	•	Build the app for Firebase deployment and deploy using the Firebase CLI.
	•	Review Firebase Functions logs to troubleshoot any issues.

Use this README as a guide to set up, configure, and deploy your FIReMVP application.