import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAGVEyieFwqqW5BSPVFVUp6EJaHuczS8Wc",
  authDomain: "ppp-8eefe.firebaseapp.com",
  projectId: "ppp-8eefe",
  storageBucket: "ppp-8eefe.appspot.com",
  messagingSenderId: "613105304738",
  appId: "1:613105304738:web:75f4a66afb17ef4ad303fb",
  measurementId: "G-T6PXL6TDKF",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export { storage };
