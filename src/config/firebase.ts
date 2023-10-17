// import firebase from "firebase/app";
// import "firebase/storage";

// if (!firebase.apps.length) {
//   const config = {
//     apiKey: "YOUR_API_KEY",
//     authDomain: "YOUR_AUTH_DOMAIN",
//     projectId: "YOUR_PROJECT_ID",
//     storageBucket: "YOUR_STORAGE_BUCKET",
//     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//     appId: "ppp-8eefe",
//   };
//   firebase.initializeApp(config);
// }

// const storage = firebase.storage();

// export { storage, firebase as default };

/////////////////////////////////////////////////////////
// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGVEyieFwqqW5BSPVFVUp6EJaHuczS8Wc",
  authDomain: "ppp-8eefe.firebaseapp.com",
  projectId: "ppp-8eefe",
  storageBucket: "ppp-8eefe.appspot.com",
  messagingSenderId: "613105304738",
  appId: "1:613105304738:web:75f4a66afb17ef4ad303fb",
  measurementId: "G-T6PXL6TDKF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export { storage };
