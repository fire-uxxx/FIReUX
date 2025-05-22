# FIReUX - SaaS & MVP Hub 🚀

**FIReUX** is the central hub for SaaS app templates, starting with **FIReMVP**—a Firebase & Stripe-powered starter kit.

## 🛠️ Setup

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/fire-uxxx/fireux.git
cd fireux
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Configure Firebase

Create a `.env` file in the root directory:

```env
# Firebase Admin Credentials
GOOGLE_APPLICATION_CREDENTIALS=./config/service-account.json

# Firebase Configuration
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
FIREBASE_APP_ID=your_firebase_app_id
FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 4️⃣ Set Up Firebase Admin SDK

Ensure your service account file exists:

```sh
ls config/service-account.json
```

If missing, generate a new one from Firebase Console → Project Settings → Service Accounts.

### 5️⃣ Run Development Server

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 6️⃣ Deploy to Firebase

```sh
firebase deploy --only hosting,functions
```

### 7️⃣ Init Firebase Functions (once per project)

```sh
firebase init functions
```

---

## 🧠 Multi-Tenant SaaS: Flexible Approaches

FIReUX is designed with scalability in mind. Whether you're serving one client or 100, the system supports multiple tenant strategies depending on your business model and technical preference.

### 🔀 Multi-Tenant Options

#### 1. **Separate Firebase Projects (Recommended for Freelancers & Agencies)**

This model is ideal if each client needs full data separation and independent hosting.

**Steps:**

- Create a new Firebase project per client (e.g., `coolcleaners`, `fastlaundrypro`).
- Deploy a fresh instance of the FIReUX app.
- Use a unique Firestore DB and Auth system for each client.
- Assign `isAdmin = true` to your client's account in their Firestore.

This ensures full data and permission isolation with minimal complexity.

#### 2. **Single Firebase Project, Multiple Apps (Advanced)**

This model allows multiple tenants to share a single Firebase backend, using custom `tenantId` claims or document partitioning.

**Strategies:**

- Use custom claims (e.g. `{ tenantId: 'coolcleaners' }`) to scope user access.
- Prefix or nest documents by `tenantId` in Firestore:
  ```
  apps/{tenantId}/users/{userId}
  apps/{tenantId}/jobs/{jobId}
  apps/{tenantId}/products/{productId}
  ```
- Apply Firestore Rules to restrict access by `tenantId`:
  ```firestore
  match /apps/{tenantId}/{collection}/{docId} {
    allow read, write: if request.auth.token.tenantId == tenantId;
  }
  ```

⚠️ This approach requires strict rule management and deeper familiarity with Firebase security.

#### 3. **Hybrid: Core Engine + Tenant Forks**

If you're selling this as a SaaS template:

- Keep a core repo (like this one).
- Fork it per client or offer it as a white-label package.
- Optionally, automate deployments via scripts or CI/CD pipelines.

---

### 🔒 Admin Setup

Regardless of model, FIReUX supports optional admin control via PIN and onboarding flow. You can:

- Set `isAdmin = true` for a user after sign-up.
- Restrict access to certain parts of the app unless `isAdmin` is true.
- Use onboarding to pre-register app-specific metadata (logo, site name, etc.).

---

### 🧪 Custom Claims for Context

On sign-up, FIReUX sets a custom claim:

```json
{ "tenantId": "fireux" }
```

You can modify this logic to dynamically apply `tenantId` or role-based access (`isAdmin`, `plan`, etc.).

---

This flexibility allows you to grow from a single-template MVP to a full SaaS platform, at your own pace.

---

🔥 FIReUX powers FIReMVP & future SaaS templates.
👉 Visit FIReUX for details.

---

## 🚀 Stripe Integration & Product Creation

FIReUX now includes a streamlined product creation flow integrated with Stripe. This setup allows you to:

- **Create Products:** Use our custom product creation page to add products with details such as name, description, price, image, and active status. The form sends data to a dedicated API endpoint (`/api/create-stripe-product`), which creates the product and its price on Stripe and writes a record to Firestore.

- **Real-Time Sync with Firestore:**
  Products created via the UI are stored in Firestore, enabling real-time updates and easy querying on your product page.

- **Secure Stripe Integration:**
  We recommend using a **restricted API key** for Stripe. When creating this key in your Stripe dashboard, select the option that best describes your use case: **"You're using this key in a project you're building."** Grant write permissions (which include read access) for Products and Prices. Optionally, enable additional permissions (such as Customers or Checkout Sessions) if your project evolves.

- **Environment Variables:**
  Update your `.env` file with your Stripe keys:

  ```env
  # Stripe Keys
  STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
  STRIPE_SECRET_KEY=your_stripe_secret_key
  ```

This integration leverages our existing Firebase & Stripe-powered architecture, keeping your user data secure and providing a smooth product management experience. As you scale, you can further customize and extend these features to suit your multi-tenant SaaS needs.

## 🔐 Stripe Webhook Setup for SaaS + Multi‑Tenant (FIReUX)

This project supports multi‑app product enrichment by listening to Stripe webhooks and storing metadata in Firestore.

1. ✅ Securely Store Your Webhook Secret

   Instead of `.env`, use Firebase’s Secret Manager:

   ```sh
   firebase functions:secrets:set STRIPE_WEBHOOK_SECRET
   ```

   Paste in your Stripe secret (starts with `whsec_...`).

2. 🔁 Configure Endpoint in Stripe Dashboard

   In your Stripe Dashboard:

   - Go to **Developers → Webhooks**
   - Click **Add endpoint**
   - **URL:**
     ```text
     https://us-central1-<your-project>.cloudfunctions.net/stripeWebhook
     ```
   - Select relevant events (e.g. `product.created`)
   - Save and copy the signing secret into your Firebase Secret.

3. 🧠 How Multi‑Tenant Enrichment Works

   When creating products via Stripe, attach metadata to identify the app + user:

   ```js
   metadata: {
     tenantId: 'fireux',
     createdBy: 'user_abc123'
   }
   ```

   Our webhook listens for `product.created` and writes to Firestore:

   ```text
   /products/{stripeProductId} → {
     tenantId,
     createdBy,
     createdAt,
     …
   }
   ```

   This allows filtering and SaaS segregation of products in both frontend and backend.

## 🔐 Required Firebase Secret: `TENANT_ID`

Before deploying functions, you **must set the `TENANT_ID` secret** in your Firebase project. This is critical for identifying the tenant environment during webhook processing (e.g., Stripe product enrichment).

### ✅ How to Set It

Run this from the root of your project:

```bash
firebase functions:secrets:set TENANT_ID
```

When prompted, enter your internal tenant identifier, e.g.:

```
fireux
```

> ⚠️ If this secret is not set, Stripe webhooks (like `product.created`) will fail silently or log errors.

### 🧪 Verify the Secret

You can confirm the value at any time with:

```bash
firebase functions:secrets:access TENANT_ID
```

This should return:

```
"fireux"
```

### 🛠 When to Run

- After cloning the project
- When setting up a new Firebase project
- Before deploying functions that depend on `TENANT_ID`

# FIReUX App

## Environment Variables

All environment variables are defined in the `.env` file at the project root. Here are the key variables and their purpose:

### Project Metadata

- `APP_NAME` — Application display name (used throughout the UI)
- `TENANT_ID` — Internal tenant identifier (was APP_ID)
- `AUTHOR_NAME` — Project author

### App Settings

- `APP_SHORT_NAME` — Short name for the app (used in PWA and UI)
- `APP_THEME_COLOR` — Theme color for browser and PWA
- `APP_BACKGROUND_COLOR` — Background color for splash screen
- `APP_ICON` — Icon name for the app (used in navigation, etc.)
- `NODE_ENV` — Node environment (`development` or `production`)
- `DOMAIN` — Production domain for the app
- `DEV_DOMAIN` — Local development domain for CORS
- `PIN` — Developer PIN for admin unlock

### Firebase Admin Credentials

- `GOOGLE_APPLICATION_CREDENTIALS` — Path to your Firebase Admin SDK JSON

### Firebase Configuration

- `FIREBASE_API_KEY` — Firebase Web API Key
- `FIREBASE_AUTH_DOMAIN` — Firebase Auth Domain
- `FIREBASE_PROJECT_ID` — Firebase Project ID
- `FIREBASE_STORAGE_BUCKET` — Firebase Storage Bucket
- `FIREBASE_MESSAGING_SENDER_ID` — Firebase Messaging Sender ID
- `FIREBASE_APP_ID` — Firebase App ID
- `FIREBASE_MEASUREMENT_ID` — Firebase Analytics Measurement ID

### Stripe Keys

- `STRIPE_PUBLISHABLE_KEY` — Stripe Public Key
- `STRIPE_SECRET_KEY` — Stripe Secret Key
- `STRIPE_WEBHOOK_SECRET` — Stripe Webhook Secret

### OpenAI

- `OPENAI_API_KEY_NAME` — OpenAI API key name for integrations
- `OPENAI_API_KEY` — OpenAI API key

## Usage

- Update the `.env` file with your own values as needed.
- The app will use `APP_NAME` for navigation and branding.
- For PWA and theming, use `APP_SHORT_NAME`, `APP_THEME_COLOR`, and `APP_BACKGROUND_COLOR`.
- For Firebase and Stripe, ensure all required keys are set.

## Notes

- Do not commit sensitive keys to public repositories.
- For local development, copy `.env` to `.env.local` and adjust as needed.

---

For more details, see the comments in the `.env` file.
