// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyAK2e2D9V4zEjRJv7MOoQngdLgvmUaantI",
    authDomain: "silent-spaces-locator-cs-440-5.firebaseapp.com",
    projectId: "silent-spaces-locator-cs-440-5",
    storageBucket: "silent-spaces-locator-cs-440-5.appspot.com",
    messagingSenderId: "1876285792",
    appId: "1:1876285792:web:97b1e16c02fd0c24fee605",
};

const app = initializeApp(firebaseConfig);

console.log("Initialized firebase config " + app);
