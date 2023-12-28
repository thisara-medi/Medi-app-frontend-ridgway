// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC9RiRncpaG8dbQXt4l8uR9Htty-21AC7w",
    authDomain: "medi-app-ridgway.firebaseapp.com",
    projectId: "medi-app-ridgway",
    storageBucket: "medi-app-ridgway.appspot.com",
    messagingSenderId: "887195212873",
    appId: "1:887195212873:web:3a8e6d350e9294561f7398",
    measurementId: "G-YBWHQ9N9N5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);