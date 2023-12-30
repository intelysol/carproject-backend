//! Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
//* https://firebase.google.com/docs/web/setup#available-libraries

//? Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAd7gCBJLpvWLK21QC4luXY0MB8F9gqOnc",
  authDomain: "duby-drive.firebaseapp.com",
  projectId: "duby-drive",
  storageBucket: "duby-drive.appspot.com",
  messagingSenderId: "469216908316",
  appId: "1:469216908316:web:b54330f59e1bf0e942fbd9"
};

//! Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);