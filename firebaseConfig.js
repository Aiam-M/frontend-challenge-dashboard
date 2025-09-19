
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCnuqopSKvSxfweZXWlOOMkX0QdMq8n-ks",
    authDomain: "edenred-desafio.firebaseapp.com",
    projectId: "edenred-desafio",
    storageBucket: "edenred-desafio.firebasestorage.app",
    messagingSenderId: "1033674473613",
    appId: "1:1033674473613:web:d159e3a1272fb1b803a2c4",
    measurementId: "G-VSGMN9870N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);