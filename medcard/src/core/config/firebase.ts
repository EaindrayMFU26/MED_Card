/**
 * Firebase Configuration
 * Uses environment variables instead of hardcoded project ID
 * FOR SECURITY: Never hardcode sensitive configuration in source code
 */

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Validate that all required environment variables are set
const missingVars = Object.entries(firebaseConfig)
  .filter(([_, value]) => !value)
  .map(([key]) => key);

if (missingVars.length > 0) {
  console.warn(
    `⚠️ Missing Firebase environment variables: ${missingVars.join(', ')}\n` +
    'Please set these in your .env file: REACT_APP_FIREBASE_*'
  );
}

export default firebaseConfig;
