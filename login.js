//importa as configurações do Firebase
import { auth } from './firebaseConfig.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();//previne o comportamento padrão do formulário de apagar
    const email = document.getElementById("Email").value;
    const password = document.getElementById("Senha").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCrendential) => {

            console.log("Usuário logado com sucesso:", userCrendential.user);
            window.location.href = "Território.html";
        })
        .catch((error) => {
            console.error("Erro ao fazer login:", error);
            alert("Erro ao fazer login: " + error.message);
            loginForm.reset();
        })
})