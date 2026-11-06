# PhotoConnect — Hardware & Connectivity

## Project Overview

PhotoConnect is a mobile application developed with Ionic React, TypeScript, and Capacitor for the Week 14 Mobile Programming assignment.

The application allows users to sign in, access protected profile information, and capture or select photos using the Capacitor Camera plugin.

## Technologies

- Ionic React
- React and TypeScript
- Capacitor Camera
- DummyJSON REST API
- JWT authentication
- Vitest for unit testing

## Features

- User authentication with an access token.
- Protected API requests using the Bearer token.
- Camera integration with Capacitor.
- Camera permission handling on native platforms.
- Photo preview after selecting or capturing an image.
- Navigation between Camera and Profile.
- Logout functionality.
- Loading, data, and error states.
- Handling of HTTP 401 errors and network failures.

## Quality & connectivity

PhotoConnect uses the Capacitor Camera plugin to capture or select photos from a device. On native platforms, the application checks camera permissions before opening the camera and requests permission when necessary. If camera access is denied, the application displays an error message explaining the problem. Users authenticate through the DummyJSON API and receive an access token. The application sends this token in the Authorization header when requesting protected profile information. If the API returns HTTP 401 Unauthorized, the application clears the active session and redirects the user to the login screen. When the network connection fails, PhotoConnect displays an error message and allows the user to retry the request. The interface provides loading, data, and error states to improve the user experience.

## Demo Credentials

The application uses the public DummyJSON demonstration API.

- Username: `emilys`
- Password: `emilyspass`

These credentials are for demonstration purposes only.

## How to Run

Install the project dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in the terminal.

## Unit Tests

The project includes three unit tests using Vitest:

1. Handling HTTP 401 Unauthorized responses.
2. Handling network connection errors.
3. Retrieving protected user information.

Run the tests:

```bash
npx vitest run src/tests/api.test.ts
```

All three unit tests passed during development using mocked API responses.

## Testing Notes

The camera plugin was tested in a web browser using the image selection interface. Native camera permissions still require validation on an Android device.

The authentication flow, protected profile request, invalid credentials, HTTP 401 handling, and offline recovery were tested during development.

## Academic Information

- Course: Mobile Programming
- Assignment: Week 14 — Hardware and Connectivity
- Delivery: Individual
- Platform: GitHub
