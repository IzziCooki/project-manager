# Client & Project Compass

This React-based web application helps you navigate your professional landscape by keeping a clear overview of potential clients and upcoming projects, all running securely on your local machine.

## ✨ Features at a Glance

- **Centralized Client Database**: Effortlessly add, update, and manage details for all your prospective clients
- **Dynamic Project Tracking**: Monitor the progress and key information of your projects from inception to completion
- **Privacy-First Data Storage**: All your valuable data resides locally on your computer, ensuring complete control and privacy
- **Intuitive User Interface**: A clean and straightforward design makes managing your professional pipeline a breeze

---

## 🚀 Quick Start

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Firebase (see Firebase Configuration section below)
4. Start the development server:
   ```bash
   npm start
   ```

The app will open at [http://localhost:3000](http://localhost:3000)

---

## 🔥 Firebase Configuration

### Step 1: Get Your Firebase Configuration

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project (or create a new one)
3. Navigate to **Settings** → **Project settings**
4. Scroll down to **"Your apps"** section
5. Click the web app icon (`</>`) or select your existing web app
6. Copy the configuration object

### Step 2: Update firebase.js

Replace the empty strings in your `firebase.js` file with your actual Firebase configuration values:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key-here",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id"
};
```

### Configuration Fields Reference

| Field | Description |
|-------|-------------|
| `apiKey` | Your web API key for Firebase |
| `authDomain` | The domain used for Firebase Authentication |
| `projectId` | Your Firebase project ID |
| `storageBucket` | The default Cloud Storage bucket |
| `messagingSenderId` | The sender ID for Firebase Cloud Messaging |
| `appId` | Your Firebase app ID |
| `measurementId` | Google Analytics measurement ID (optional) |

### 🔒 Security Best Practices

#### Option 1: Environment Variables (Recommended)

Create a `.env` file in your project root:

```env
REACT_APP_FIREBASE_API_KEY=your-api-key-here
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
REACT_APP_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

Then update your `firebase.js`:

```javascript
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};
```

#### Option 2: Git Ignore

Add these files to your `.gitignore`:

```gitignore
# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Firebase config (if storing keys directly)
src/firebase.js
```

> ⚠️ **Important**: Never commit API keys or sensitive configuration to version control!

---

## 📋 Available Scripts

### Development

```bash
npm start
```
Runs the app in development mode with hot reloading at [http://localhost:3000](http://localhost:3000)

### Testing

```bash
npm test
```
Launches the test runner in interactive watch mode

### Production Build

```bash
npm run build
```
Creates an optimized production build in the `build` folder

### Advanced Configuration

```bash
npm run eject
```
**⚠️ Warning**: This is a one-way operation! Only use if you need full control over the build configuration

---

## 📚 Learn More

### Documentation

- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React Documentation](https://reactjs.org/)
- [Firebase Documentation](https://firebase.google.com/docs)

### Advanced Topics

- [Code Splitting](https://facebook.github.io/create-react-app/docs/code-splitting)
- [Bundle Size Analysis](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)
- [Progressive Web App](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)
- [Deployment Guide](https://facebook.github.io/create-react-app/docs/deployment)

---

## 🛠️ Troubleshooting

### Common Issues

**Build fails to minify**: See the [troubleshooting guide](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

**Firebase connection issues**: Verify your configuration values and ensure your Firebase project has the correct services enabled

**Environment variables not loading**: Make sure your `.env` file is in the project root and variable names start with `REACT_APP_`

---

## 📄 License

This project is for personal and professional use. Please ensure compliance with Firebase's terms of service.
