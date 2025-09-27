# Secure TODO App

### List of features

*   **User Authentication:** Secure login using device biometrics or passcode. If nothing is defined, it redirects to the correct setting page.
*   **Native modules:** For demo purposes, I've added a button on login screen to open android settings from a native module in addition to the login button
*   **TODO Management:** Add, toggle completion status, edit, and delete TODO items.
*   **Persistence:** TODOs are saved locally on the device using AsyncStorage.
*   **Intuitive UI:** Clean and responsive user interface.
*   **Constant everything:** Centralized values are stored in constant file (localstorage keys).
*   **Tests:** Implemented a list of test for adding, editing, toggling, deleting.

### What is not implemented

* iOS device testing. I don't have an iPhone, so I only can use an emulator. For demo purposes, I only implemented Android native module.
* State management library. I've used react context instead.
* Translation instead of using raw strings
* Use a centralised css file for colors, fonts, shared values...
* Real database storage instead of local storage
* Optimisation of android folder. I uploaded the default keystore and settings for convenience.

## Description

A secure mobile TODO application built with React Native and Expo. This application allows users to manage their daily tasks with an added layer of security through local authentication (biometrics or passcode).

## Technologies Used

*   **React Native:** For building native mobile applications using JavaScript and React.
*   **Expo:** A framework and platform for universal React applications.
*   **TypeScript:** For type-safe JavaScript development.
*   **`expo-router`:** For file-based routing.
*   **`@react-native-async-storage/async-storage`:** For local data persistence.
*   **`expo-local-authentication`:** For device-based authentication (biometrics/passcode).
*   **`@tabler/icons-react-native`:** For vector icons.
*   **`react-native-svg`:** For SVG support.
*   **`react-native-safe-area-context`:** For handling safe area insets.
*   **`react-native-screens`:** For native navigation primitives.
*   **`expo-linking`:** To handle deep linking and URLs.

## Installation

To set up and run the project locally, follow these steps:

### Prerequisites

*   Node.js (LTS version recommended)
*   npm or Yarn
*   Expo CLI (`npm install -g expo-cli` or `yarn global add expo-cli`)
*   A mobile device or emulator/simulator for iOS or Android.

### Steps

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/secure-todo.git
    cd secure-todo
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Install iOS pods (if developing for iOS):**
    ```bash
    npx pod-install
    ```

4.  **Start the Expo development server:**
    ```bash
    npm start
    # or
    yarn start
    ```

5.  **Run on your device/emulator:**
    *   Scan the QR code displayed in your terminal or browser with the Expo Go app on your mobile device.
    *   Alternatively, press `i` for iOS simulator or `a` for Android emulator in the terminal.

## Available Scripts

In the project directory, you can run the following commands:

*   `npm start`: Runs the app in development mode with Expo.
*   `npm run android`: Deploys the app to a connected Android device or emulator.
*   `npm run ios`: Deploys the app to the iOS simulator.
*   `npm run web`: Runs the app in a web browser.
*   `npm test`: Runs the test suite with Jest.

## Usage

1.  **Login:** On first launch, you will be prompted to set up or use your device's local authentication (biometrics or passcode) to access the TODO list.
2.  **Add TODOs:** Use the input field at the bottom to add new tasks.
3.  **Toggle Completion:** Tap on a TODO item to mark it as complete or incomplete.
4.  **Edit TODOs:** Tap the edit icon next to a TODO item. The item's text will appear in the input field at the bottom, allowing you to modify it. Press the checkmark to save changes.
5.  **Delete TODOs:** Tap the delete icon next to a TODO item to remove it.
6.  **Logout:** Use the logout button in the header to secure your TODO list again.

## Testing

This project uses Jest for testing. The following libraries are used to facilitate testing:

*   **`jest-expo`**: A preset for Jest that configures it for testing Expo projects.
*   **`@testing-library/react-native`**: Provides utilities to test React Native components in a way that resembles how users interact with them.

To run the tests, execute the following command:

```bash
npm test
# or
yarn test
```