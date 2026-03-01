# MED_Card

## Week 05 screens (locked)
- HomeScreen
- MedCardShowScreen (Quick Show)
- MedCardEditScreen (custom form)
- ChecklistScreen
- SettingsScreen

Splash and onboarding remain simple.

## Deploy on Firebase Hosting (Expo Web)

From the `medcard` folder:

1. Install dependencies
	- `npm install`
2. Install Firebase CLI (one-time, global)
	- `npm install -g firebase-tools`
	- Or use `npx firebase-tools` for each command
3. Login to Firebase
	- `firebase login`
4. Create/select a Firebase project in Firebase Console and put the project id in `medcard/.firebaserc`:
	- `"default": "YOUR_FIREBASE_PROJECT_ID"`
5. Build and deploy:
	- `npm run deploy:web`

The deploy command builds Expo web output to `medcard/dist` and deploys it to Firebase Hosting.

## Auto-deploy on push to `main` (GitHub Actions)

A workflow is configured at `.github/workflows/firebase-hosting-deploy.yml` to deploy automatically on every push to `main`.

Set these repository secrets in GitHub (`Settings` → `Secrets and variables` → `Actions`):

- `FIREBASE_PROJECT_ID`: your Firebase project id
- `FIREBASE_SERVICE_ACCOUNT_MEDCARD`: full JSON content of a Firebase service account key

To create the service account key JSON:

1. Open Firebase Console → Project Settings → Service accounts
2. Click **Generate new private key**
3. Copy the entire JSON and paste it as the value of `FIREBASE_SERVICE_ACCOUNT_MEDCARD`

After secrets are added, pushing to `main` will build Expo web and deploy to Firebase Hosting automatically.