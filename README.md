Chat App
Welcome to the Chat App! This application allows users to easily connect and communicate with friends and family through text, images, and location sharing. Built with React Native and Expo, it provides a user-friendly interface and offline capabilities.

Features
User-Friendly Onboarding: New users can easily enter a chat room by entering their name and choosing a background color for the chat screen.
Messaging: Users can send text messages to friends and family to exchange news.
Image Sharing: Users can share images from their device's gallery or take new pictures with the camera to share their current activities.
Location Sharing: Users can share their current location with friends.
Offline Access: Users can read their messages offline, allowing for convenient conversation review at any time.
Accessibility: The app is compatible with screen readers for users with visual impairments.
Technical Requirements
Developed with React Native and Expo.
Styled according to the provided screen design.
Chat conversations are stored in Google Firestore Database.
Users are authenticated anonymously via Google Firebase Authentication.
Messages and media are stored both online and offline.
Users can pick images from their device's image library or capture new photos with the device's camera.
Images are stored in Firebase Cloud Storage.
The app retrieves and utilizes the user’s location data.
Getting Started
Prerequisites
Node.js installed on your machine.
Expo CLI installed. You can install it globally using:
bash
Code kopieren
npm install -g expo-cli
Installation
Clone the repository:

bash
Code kopieren
git clone https://github.com/yourusername/chat-app.git
cd chat-app
Install the dependencies:

bash
Code kopieren
npm install
Set up Firebase:

Create a Firebase project and enable Firestore and Firebase Storage.
Add your Firebase configuration to the app.
Start the development server:

bash
Code kopieren
expo start
Follow the instructions in the terminal to run the app on an emulator or physical device.

Usage
Upon opening the app, users can enter their name and select a background color for the chat.
Users can send text messages, images, and their location.
Offline messaging is supported, allowing users to read previous conversations.
Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Contact
For inquiries, feel free to reach out to unreached1@gmail.com or open an issue in the repository.

Thank you for checking out the Chat App! Enjoy connecting with your friends and family!
