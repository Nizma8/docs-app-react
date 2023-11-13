// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCnEpyREoDUmJLhiO_WvgmYChXJQ4jFcrQ",
  authDomain: "fir-learn-af170.firebaseapp.com",
  projectId: "fir-learn-af170",
  storageBucket: "fir-learn-af170.appspot.com",
  messagingSenderId: "1053022336948",
  appId: "1:1053022336948:web:aa5016f09e9c0cadc424e1",
  measurementId: "G-5DM445J5RV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app)

