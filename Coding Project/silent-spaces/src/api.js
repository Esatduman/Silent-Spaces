// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// const firebaseConfig = {
//     apiKey: "AIzaSyAK2e2D9V4zEjRJv7MOoQngdLgvmUaantI",
//     authDomain: "silent-spaces-locator-cs-440-5.firebaseapp.com",
//     projectId: "silent-spaces-locator-cs-440-5",
//     storageBucket: "silent-spaces-locator-cs-440-5.appspot.com",
//     messagingSenderId: "1876285792",
//     appId: "1:1876285792:web:97b1e16c02fd0c24fee605",
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);

// onAuthStateChanged(auth, (user) => {
//     if (user) {
//         // User is signed in, see docs for a list of available properties
//         // https://firebase.google.com/docs/reference/js/auth.user
//         const uid = user.uid;
//         // ...
//     } else {
//         // User is signed out
//         // ...
//     }
// });

// const set_user_profile = (profile) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const docRef = await addDoc(collection(db, "users"), {
//                 first: "Ada",
//                 last: "Lovelace",
//                 born: 1815,
//             });
//             console.log("Document written with ID: ", docRef.id);
//         } catch (e) {
//             console.error("Error adding document: ", e);
//         }
//     });
// };

// console.log("Initialized firebase config " + app);
