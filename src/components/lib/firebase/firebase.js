 // Import the functions you need from the SDKs you need
import { deleteApp,getApps, getApp, initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN ,
  projectId: import.meta.env.VITE_PROJECT_ID ,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET ,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID ,
  appId: import.meta.env.VITE_APPID
};

// Initialize Firebase
let firebaseApp;
if(!getApps().length) {
    firebaseApp = initializeApp(firebaseApp)
} else {
    firebaseApp = getApp()
    deleteApp(firebaseApp)
    firebaseApp = initializeApp(firebaseApp)
}

export const db = getFirestore(firebaseApp)
export const auth = getAuth(firebase)