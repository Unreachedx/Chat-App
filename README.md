Chat App
Welcome to the Chat App! This application allows users to connect and communicate with friends and family through text, images, and location sharing. Built with React Native and Expo, it provides a user-friendly interface and offline capabilities.

Features
User-Friendly Onboarding: New users can easily join a chat room by entering their name and selecting a background color.
Messaging: Users can send text messages to friends and family.
Image Sharing: Users can share images from their gallery or take photos in real-time.
Location Sharing: Users can share their current location with friends.
Offline Access: Users can read messages offline to review conversations anytime.
Accessibility: The app is compatible with screen readers for users with visual impairments.
Technical Requirements
The app requires the following environment setup, dependencies, and database configuration.

Environment Setup
Install Node.js: Download and install Node.js from https://nodejs.org.

Install Expo CLI: Install Expo CLI globally to run the app with Expo:

bash
npm install -g expo-cli
Install Android Studio (for Android development):

Download Android Studio from https://developer.android.com/studio.
Follow the setup instructions and ensure that the Android SDK and a virtual device (emulator) are configured.
Set up Xcode (for iOS development):

Xcode is required for iOS development and can be downloaded from the Mac App Store. Make sure to install Command Line Tools within Xcode.
Database Configuration
Create a Firebase Project:

Go to Firebase Console and create a new project.
Enable Firestore Database and Firebase Storage for storing chat messages and media.
Enable Anonymous Authentication for user authentication.
Add Firebase Configuration to Your App:

Obtain your Firebase configuration details (API key, project ID, app ID, etc.) from the Firebase Console under Project Settings.

Create a firebaseConfig.js file in your project directory and add the configuration as follows:

javascript
// firebaseConfig.js
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
};

const app = initializeApp(firebaseConfig);
export default app;
Enable Firestore and Firebase Storage:

In the Firebase Console, navigate to Firestore Database and select "Start in Test Mode" for easy setup during development.
In Storage, set up appropriate rules for storing images or enable "Test Mode" to allow unrestricted access temporarily during development.
Installation
Clone the Repository:

bash
git clone https://github.com/yourusername/chat-app.git
cd chat-app
Install Dependencies:

bash
npm install
Install Required Libraries: Ensure the following libraries are installed. They should already be listed in your package.json, but if not, install each as follows:

bash
npm install @expo/metro-runtime@~3.2.3
npm install @react-native-async-storage/async-storage@^1.23.1
npm install @react-native-community/masked-view@^0.1.11
npm install @react-native-community/netinfo@11.3.1
npm install @react-navigation/native@^6.1.18
npm install @react-navigation/native-stack@^6.11.0
npm install expo@~51.0.37
npm install expo-image-picker@~15.0.7
npm install expo-location@~17.0.1
npm install expo-status-bar@~1.12.1
npm install firebase@^10.3.1
npm install react@18.2.0 react-dom@18.2.0
npm install react-native@0.74.5
npm install react-native-gesture-handler@~2.16.1
npm install react-native-gifted-chat@^2.6.4
npm install react-native-maps@^1.18.2
npm install react-native-reanimated@~3.10.1
npm install react-native-safe-area-context@^4.10.5
npm install react-native-screens@^3.31.1
npm install react-native-web@~0.19.10
Run the Development Server:

bash
expo start
Follow the terminal instructions to open the app on an emulator or physical device.

Usage
User Onboarding: Upon opening the app, users enter their name and choose a background color for the chat screen.
Messaging: Users can send text, images, and location information.
Offline Access: Users can view previously cached messages when offline.
Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Contact
For inquiries, reach out to unreached1@gmail.com or open an issue in the repository.

Thank you for checking out the Chat App! Enjoy connecting with your friends and family!