
![Banner Image](https://i.imgur.com/v2XujHT.jpeg)

# ImageFuse

ImageFuse is a secure file upload and sharing application built using ReactJS and Firebase. This repository contains the source code for the ImageFuse web application.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Setup](#setup)
- [Firebase Configuration](#firebase-configuration)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- Secure file upload and sharing
- Easy-to-use interface
- Firebase authentication and storage integration
- Responsive design

## Installation

Follow these steps to get your development environment set up:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/itfeelsharsh/imagefuse.git
   cd imagefuse
   ```

2. **Install Dependencies**

   Make sure you have [Node.js](https://nodejs.org/) installed. Then, run:

   ```bash
   npm install
   ```

## Setup

1. **Rename the Firebase Configuration File**

   Rename the `firebase.js.example` file to `firebase.js`. This file contains Firebase configuration settings.

   ```bash
   mv src/firebase.js.example src/firebase.js
   ```

2. **Add Firebase Credentials**

   To get your Firebase credentials:

   - Go to the [Firebase Console](https://console.firebase.google.com/).
   - Select your project or create a new one.
   - Go to Project Settings (gear icon next to Project Overview).
   - In the "General" tab, scroll down to "Your apps" and select the web icon (`</>`).
   - Copy the Firebase configuration snippet and paste it into `src/firebase.js`.

   Your `firebase.js` should look like this:

   ```javascript
   import firebase from 'firebase/app';
   import 'firebase/auth';
   import 'firebase/storage';
   
   // Your web app's Firebase configuration
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };
   
   // Initialize Firebase
   firebase.initializeApp(firebaseConfig);
   
   export const auth = firebase.auth();
   export const storage = firebase.storage();
   ```

3. **Start the Development Server**

   Run the following command to start the development server:

   ```bash
   npm start
   ```

   The app will be available at `http://localhost:3000`.

## Usage

- Navigate to different pages using the navigation bar.
- Upload files securely and manage them through the user interface.
- Contact support or view terms of service and privacy policy through respective links.

## Contributing

If you want to contribute to ImageFuse, please follow these guidelines:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
