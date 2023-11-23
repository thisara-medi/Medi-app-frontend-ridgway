// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCleVew1HeiBQ0Yilf5-2-gqX-2Vp8h5hQ",
    authDomain: "test-file-upload-114c5.firebaseapp.com",
    projectId: "test-file-upload-114c5",
    storageBucket: "test-file-upload-114c5.appspot.com",
    messagingSenderId: "301259766592",
    appId: "1:301259766592:web:f706e9dc603fa03e4958a5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);