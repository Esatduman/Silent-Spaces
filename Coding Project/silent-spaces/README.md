# Silent Spaces Locator

CS-440 John Bell - Spring 2024 Group 5

## Setup

Run `npm install`

## Build

Run `npm run build`

## Testing

To view a locally hosted version of the source, run `npm run dev`.

However, be warned that I'm unsure of how this works exactly with Firebase backend. It should still be functional, as the frontend technology should be decoupled from the backend APIs of Firebase, but _testing is required to know more._

## Deployment

To deploy to firebase, run `firebase deploy`.

Sometimes, you might only want to deploy certain parts of the project, such as the security rules for Firestore.

**Deploy rules for all databases configured in your firebase.json**

`firebase deploy --only firestore:rules`

**Deploy rules for the specified database configured in your firebase.json**

`firebase deploy --only firestore:<databaseId>`

# React + Vite (README.md)

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

-   [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
-   [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
