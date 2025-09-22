// firebaseconfig.js

// 1. Importa as funções que você precisa dos SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
// ADICIONE A IMPORTAÇÃO DO FIRESTORE AQUI
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";


// 2. A sua configuração do Firebase (suas chaves)
const firebaseConfig = {
    apiKey: "AIzaSyCnuqopSKvSxfweZXWlOOMkX0QdMq8n-ks",
    authDomain: "edenred-desafio.firebaseapp.com",
    projectId: "edenred-desafio",
    storageBucket: "edenred-desafio.firebasestorage.app",
    messagingSenderId: "1033674473613",
    appId: "1:1033674473613:web:d159e3a1272fb1b803a2c4",
    measurementId: "G-VSGMN9870N"
};

// 3. Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// 4. Exporta os serviços que vamos usar na aplicação
export const auth = getAuth(app);
// COMPLETA A LINHA DO DB AQUI
export const db = getFirestore(app);